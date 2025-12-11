/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(data: Prisma.UserCreateInput) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    const user = existingUser
      ? existingUser
      : await this.prisma.user.create({
          data,
        });

    const token = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user,
    };
  }

  async fetchUser(data: { email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        address: true,
      },
    });
    return user;
  }

  async updateProfile(user, data) {
    const isUserExist = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: { address: true },
    });

    if (!isUserExist) {
      throw new NotFoundException('User not found');
    }

    const { address, ...userData } = data;

    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...userData,
        address: address
          ? {
              upsert: {
                create: {
                  ...address,
                },
                update: {
                  ...address,
                },
              },
            }
          : undefined,
      },
      include: { address: true },
    });
  }

  async updateUserImage(user, file) {
    const isUserExist = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!isUserExist) {
      throw new NotFoundException('User Not Found');
    }
    if (isUserExist.image) {
      await this.cloudinaryService.deleteImage(isUserExist.image);
    }
    const data = {
      image: '',
    };
    if (file) {
      const imageUrl = await this.cloudinaryService.uploadImage(file, 'user');
      data.image = imageUrl;
    }

    return await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data,
      include: {
        address: true,
      },
    });
  }

  async fetchAll() {
    return this.prisma.user.findMany({
      include: { address: true },
      orderBy: { id: 'asc' },
    });
  }
}
