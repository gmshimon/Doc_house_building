import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}
  async create(createServiceDto: Prisma.ServiceCreateInput) {
    return await this.prisma.service.create({
      data: {
        name: createServiceDto.name,
        duration: createServiceDto.duration,
        fee: createServiceDto.fee,
      },
    });
  }

  async findAll(name?: string) {
    try {
      const results = await this.prisma.service.findMany(
        {
          where: name
            ? {
                name: {
                  contains: name,
                  mode: 'insensitive',
                },
              }
            : undefined,
            include: { 
              appointments: true,
              doctors: true,
              slots: true
            }
        },

      );
      return results;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching services');
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.service.findUnique({
        where: { id },
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching service');
    }
  }

  async update(id: number, updateServiceDto: Prisma.ServiceUpdateInput) {
    const result = await this.prisma.service.update({
      where: { id },
      data: {
        name: updateServiceDto.name,
        duration: updateServiceDto.duration,
        fee: updateServiceDto.fee,
      },
    });
    return result;
  }

  async remove(id: number) {
    const result = await this.prisma.service.delete({
      where: { id },
    });
    return result;
  }
}
