import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
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
    });
    return user;
  }
}
