/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}
  async create(createServiceDto: CreateServiceDto) {
    const doctorConnectData = createServiceDto.doctorIds
      ? createServiceDto.doctorIds.map((id) => ({ id }))
      : [];

    return await this.prisma.service.create({
      data: {
        name: createServiceDto.name,
        duration: createServiceDto.duration,
        fee: createServiceDto.fee,
        doctors: {
          connect: doctorConnectData,
        },
      },
      include: {
        doctors: true,
        slots: true,
        appointments: true,
      },
    });
  }

  async findAll(name?: string) {
    try {
      const results = await this.prisma.service.findMany({
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
          slots: true,
        },
        orderBy: {
          id: 'asc',
        },
      });
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

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    try {
      const doctorRelationData = updateServiceDto.doctorIds
        ? {
            set: updateServiceDto.doctorIds.map((doctorId) => ({
              id: doctorId,
            })),
          }
        : undefined;
      const result = await this.prisma.service.update({
        where: { id },
        data: {
          name: updateServiceDto.name,
          duration: updateServiceDto.duration,
          fee: updateServiceDto.fee,
          doctors: doctorRelationData,
        },
        include: {
          doctors: true,
          slots: true,
          appointments: true,
        },
      });
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching services');
    }
  }

  async remove(id: number) {
    const appointmentCount = await this.prisma.appointment.count({
      where: { serviceId: id },
    });

    if (appointmentCount > 0) {
      throw new ConflictException(
        'Cannot delete service because it is referenced by existing appointments.',
      );
    }

    const result = await this.prisma.service.delete({
      where: { id },
    });
    return result;
  }
}
