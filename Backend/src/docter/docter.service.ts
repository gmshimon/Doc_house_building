import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateDocterDto } from './dto/update-docter.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class DocterService {
  constructor(
    private prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  private normalizeAddressInput(
    value?: unknown,
  ): Prisma.AddressCreateNestedOneWithoutDoctorInput | undefined {
    if (!value) {
      return undefined;
    }

    if (
      this.isRecord(value) &&
      ('create' in value || 'connect' in value || 'connectOrCreate' in value)
    ) {
      return value as Prisma.AddressCreateNestedOneWithoutDoctorInput;
    }

    return {
      create: value,
    } as Prisma.AddressCreateNestedOneWithoutDoctorInput;
  }

  private normalizeDateRangeNestedInput<T>(value?: unknown): T | undefined {
    if (!value) {
      return undefined;
    }

    const normalizeEntry = (entry: Record<string, unknown>) => {
      if (!entry) {
        return entry;
      }

      const { startDate, endDate, ...rest } = entry;
      return {
        ...rest,
        startDate: startDate,
        endDate: endDate,
      };
    };

    if (Array.isArray(value)) {
      return {
        create: value.map((entry) =>
          normalizeEntry(entry as Record<string, unknown>),
        ),
      } as T;
    }

    if (this.isRecord(value) && 'create' in value) {
      const recordValue = value;
      const createValue = recordValue.create;

      if (Array.isArray(createValue)) {
        return {
          ...recordValue,
          create: createValue.map((entry) =>
            normalizeEntry(entry as Record<string, unknown>),
          ),
        } as T;
      }

      if (createValue) {
        return {
          ...recordValue,
          create: normalizeEntry(createValue as Record<string, unknown>),
        } as T;
      }
    }

    return value as T;
  }

  private normalizeSimpleNestedInput(
    value?: unknown,
  ): Prisma.AwardCreateNestedManyWithoutDoctorInput | undefined {
    if (!value) {
      return undefined;
    }

    if (Array.isArray(value)) {
      return {
        create: value,
      } as Prisma.AwardCreateNestedManyWithoutDoctorInput;
    }

    return value as Prisma.AwardCreateNestedManyWithoutDoctorInput;
  }

  private normalizeBusinessHourNestedInput(
    value?: unknown,
  ): Prisma.Business_hourCreateNestedManyWithoutDoctorInput | undefined {
    if (!value) {
      return undefined;
    }

    const normalizeEntry = (entry: Record<string, unknown>) => {
      const { isClose, ...rest } = entry;
      return {
        ...rest,
        isClose: this.toBoolean(isClose),
      };
    };

    if (Array.isArray(value)) {
      return {
        create: value.map((entry) =>
          normalizeEntry(entry as Record<string, unknown>),
        ),
      } as Prisma.Business_hourCreateNestedManyWithoutDoctorInput;
    }

    if (this.isRecord(value) && 'create' in value) {
      const recordValue = value;
      const createValue = recordValue.create;

      if (Array.isArray(createValue)) {
        return {
          ...recordValue,
          create: createValue.map((entry) =>
            normalizeEntry(entry as Record<string, unknown>),
          ),
        } as Prisma.Business_hourCreateNestedManyWithoutDoctorInput;
      }

      if (createValue) {
        return {
          ...recordValue,
          create: normalizeEntry(createValue as Record<string, unknown>),
        } as Prisma.Business_hourCreateNestedManyWithoutDoctorInput;
      }
    }

    return value as Prisma.Business_hourCreateNestedManyWithoutDoctorInput;
  }

  private toDate(value: unknown): Date | undefined {
    if (!value) {
      return undefined;
    }
    if (value instanceof Date) {
      return value;
    }
    if (typeof value === 'string' || typeof value === 'number') {
      const parsed = new Date(value);
      if (!Number.isNaN(parsed.valueOf())) {
        return parsed;
      }
    }
    return undefined;
  }

  private toBoolean(value: unknown): boolean {
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    if (typeof value === 'number') {
      return value === 1;
    }
    return false;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private async cleanupUploadedImage(imageUrl?: string) {
    if (!imageUrl) {
      return;
    }
    try {
      await this.cloudinaryService.deleteImage(imageUrl);
    } catch (cleanupError) {
      console.error('Failed to cleanup uploaded image:', cleanupError);
    }
  }

  async create(createDocterDto: Prisma.DoctorCreateInput) {
    try {
      const {
        education,
        experience,
        award,
        business_hour,
        address,
        ...doctorCore
      } = createDocterDto as Prisma.DoctorCreateInput & Record<string, unknown>;

      const normalizedAddress = this.normalizeAddressInput(address);
      if (!normalizedAddress) {
        throw new BadRequestException(
          'Address information is required to create a doctor',
        );
      }

      const formattedData: Prisma.DoctorCreateInput = {
        ...doctorCore,
        education:
          this.normalizeDateRangeNestedInput<Prisma.EducationCreateNestedManyWithoutDoctorInput>(
            education,
          ),
        experience:
          this.normalizeDateRangeNestedInput<Prisma.ExperienceCreateNestedManyWithoutDoctorInput>(
            experience,
          ),
        award: this.normalizeSimpleNestedInput(award),
        business_hour: this.normalizeBusinessHourNestedInput(business_hour),
        address: normalizedAddress,
      };

      return await this.prisma.doctor.create({
        data: formattedData,
        include: {
          education: true,
          experience: true,
          award: true,
          business_hour: true,
          address: true,
        },
      });
    } catch (error) {
      if (createDocterDto.image) {
        await this.cleanupUploadedImage(createDocterDto.image);
      }
      console.error('Error creating doctor', error);
      throw new InternalServerErrorException('Failed to create doctor');
    }
  }

  async updateImage(id: number, data: { image: string }) {
    try {
      const isDoctorExist = await this.prisma.doctor.findUnique({
        where: { id },
      });
      if (!isDoctorExist) {
        throw new BadRequestException(`Doctor with ID ${id} not found`);
      }
      if (isDoctorExist.image) {
        await this.cloudinaryService.deleteImage(isDoctorExist.image);
      }
      return await this.prisma.doctor.update({
        where: { id },
        data,
        include: {
          education: true,
          experience: true,
          award: true,
          business_hour: true,
          address: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const doctors = await this.prisma.doctor.findMany({
        include: {
          education: true,
          experience: true,
          award: true,
          business_hour: true,
          address: true,
        },
      });
      return doctors;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch doctors');
    }
  }

  async findOne(id: number) {
    try {
      const doctor = await this.prisma.doctor.findUnique({
        where: { id },
        include: {
          education: true,
          experience: true,
          award: true,
          business_hour: true,
          address: true,
        },
      });
      if (!doctor) {
        throw new BadRequestException(`Doctor with ID ${id} not found`);
      }
      return doctor;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find doctor');
    }
  }

  update(id: number, updateDocterDto: UpdateDocterDto) {
    return `This action updates a #${id} docter`;
  }

  async remove(id: number) {
    try {
      const doctor = await this.prisma.doctor.findUnique({
        where: { id },
        include: {
          education: true,
          experience: true,
          award: true,
          business_hour: true,
          address: true,
        },
      });

      await this.prisma.doctor.delete({
        where: { id },
      });

      if (doctor?.image) {
        await this.cloudinaryService.deleteImage(doctor.image);
      }
    } catch (error) {
      console.error('Error deleting doctor', error);
      throw new InternalServerErrorException('Failed to delete doctor');
    }
  }
}
