/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { REDIS_KEYS } from 'src/Utils/redis_key';

type ServiceWithRelations = Prisma.ServiceGetPayload<{
  include: {
    appointments: true;
    doctors: true;
    slots: true;
  };
}>;
@Injectable()
export class ServicesService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    const doctorConnectData = createServiceDto.doctorIds
      ? createServiceDto.doctorIds.map((id) => ({ id }))
      : [];

    await this.cacheManager.del(REDIS_KEYS.SERVICES_LIST);

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

  async findAll(name?: string): Promise<ServiceWithRelations[]> {
    try {
      const cacheKey = name
        ? REDIS_KEYS.SINGLE_SERVICE_PREFIX + name
        : REDIS_KEYS.SERVICES_LIST;

      const cachedServices =
        await this.cacheManager.get<ServiceWithRelations[]>(cacheKey);

      if (cachedServices) {
        return cachedServices;
      }

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

      await this.cacheManager.set(cacheKey, results);

      return results;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching services');
    }
  }

  async findOne(id: number) {
    try {
      const cacheKey = REDIS_KEYS.SINGLE_SERVICE_ID_PREFIX + id;

      const cachedService = await this.cacheManager.get(cacheKey);

      if (cachedService) {
        console.log('Returning single service from cache');
        return cachedService;
      }
      const result = await this.prisma.service.findUnique({
        where: { id },
      });

      await this.cacheManager.set(cacheKey, result);
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

      await this.cacheManager.del(REDIS_KEYS.SERVICES_LIST);
      await this.cacheManager.del(REDIS_KEYS.SINGLE_SERVICE_ID_PREFIX + id);
      await this.cacheManager.del(
        REDIS_KEYS.SINGLE_SERVICE_PREFIX + result.name,
      );

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
    await this.cacheManager.del(REDIS_KEYS.SERVICES_LIST);
    await this.cacheManager.del(REDIS_KEYS.SINGLE_SERVICE_ID_PREFIX + id);
    await this.cacheManager.del(REDIS_KEYS.SINGLE_SERVICE_PREFIX + result.name);

    return result;
  }
}
