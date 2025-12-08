/* eslint-disable @typescript-eslint/no-unused-vars */
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
  private doctorInclude = {
    education: true,
    experience: true,
    award: true,
    business_hour: true,
    address: true,
    services: true,
  };
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

  private normalizeServicesInput(
    value?: unknown,
  ): Prisma.ServiceCreateNestedManyWithoutDoctorsInput | undefined {
    if (!value) {
      return undefined;
    }

    const toIdArray = (input: unknown): number[] => {
      if (Array.isArray(input)) {
        return input
          .map((id) => {
            const num = Number(id);
            return Number.isNaN(num) ? undefined : num;
          })
          .filter((id): id is number => typeof id === 'number');
      }

      if (typeof input === 'string') {
        try {
          const parsed = JSON.parse(input) as unknown;
          if (Array.isArray(parsed)) {
            return parsed
              .map((id) => {
                const num = Number(id);
                return Number.isNaN(num) ? undefined : num;
              })
              .filter((id): id is number => typeof id === 'number');
          }
        } catch {
          const num = Number(input);
          return Number.isNaN(num) ? [] : [num];
        }
      }

      return [];
    };

    if (this.isRecord(value) && ('connect' in value || 'create' in value)) {
      return value as Prisma.ServiceCreateNestedManyWithoutDoctorsInput;
    }

    const ids = toIdArray(value);
    if (!ids.length) {
      return undefined;
    }

    return {
      connect: ids.map((id) => ({ id })),
    };
  }

  private normalizeStringArrayInput(value?: unknown): string[] | undefined {
    if (!value) {
      return undefined;
    }
    if (Array.isArray(value)) {
      return value.map((item) => String(item));
    }
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value) as unknown;
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item));
        }
      } catch {
        // fall back to treating the string as a single entry
        return [value];
      }
    }
    return undefined;
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

  private convertTo24Hour(time: string) {
    // Example input: "12:00 PM", "01:00 AM", "09:30 PM"
    const [t, modifier] = time.split(' '); // "12:00", "PM"
    let [hours, minutes] = t.split(':');

    if (modifier === 'PM' && hours !== '12') {
      hours = (parseInt(hours, 10) + 12).toString();
    }

    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }

    return `${hours.padStart(2, '0')}:${minutes}`;
  }

  private generateRawBlocks(
    open: string,
    close: string,
    date: string,
    blockSize = 60,
  ) {
    const blocks: any[] = [];

    const start = new Date(`${date}T${open}:00`);
    const end = new Date(`${date}T${close}:00`);

    let current = new Date(start);
    while (current < end) {
      const next = new Date(current.getTime() + blockSize * 60000);

      blocks.push({
        start: new Date(current),
        end: new Date(next),
        isAvailable: true,
      });
      current = next;
    }
    return blocks;
  }

  private removeBookedBlocks(
    blocks: { start: Date; end: Date; isAvailable: boolean }[],
    bookedSlots: any[],
    date: any,
  ) {
    console.log('bookedSlots', bookedSlots);
    console.log('blocks', blocks);
    return blocks.map((block) => {
      const isOverlap = bookedSlots.some((slot) => {
        // Convert "12:00 PM" → "12:00"
        const start24 = this.convertTo24Hour(slot.startTime);
        const end24 = this.convertTo24Hour(slot.endTime);

        const slotStart = new Date(`${date}T${start24}:00`);
        const slotEnd = new Date(`${date}T${end24}:00`);

        // overlap if times intersect
        return block.start < slotEnd && slotStart < block.end;
      });
      return {
        ...block,
        isAvailable: !isOverlap,
      };
    });
  }

  private mergeBlocksIntoSlots(
    blocks: { start: Date; end: Date; isAvailable: boolean }[],
    serviceDuration: number,
    blockSize = 10,
  ) {
    const required = serviceDuration / blockSize;
    const slots: { start: Date; end: Date }[] = [];

    for (let i = 0; i <= blocks.length - required; i++) {
      const candidate = blocks.slice(i, i + required);

      if (candidate.every((b) => b.isAvailable)) {
        slots.push({
          start: candidate[0].start,
          end: candidate[candidate.length - 1].end,
        });
      }
    }

    return slots;
  }

  async create(createDocterDto: Prisma.DoctorCreateInput) {
    try {
      const {
        education,
        experience,
        award,
        business_hour,
        address,
        services,
        serviceIds,
        specialties,
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
        services: this.normalizeServicesInput(services ?? serviceIds),
        specialties: this.normalizeStringArrayInput(specialties) ?? [],
      };

      return await this.prisma.doctor.create({
        data: formattedData,
        include: this.doctorInclude,
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

  async findAll(name?: string) {
    try {
      const doctors = await this.prisma.doctor.findMany({
        where: name
          ? {
              name: {
                contains: name,
                mode: 'insensitive',
              },
            }
          : undefined,
        include: this.doctorInclude,
        orderBy: {
          id: 'asc',
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
        include: this.doctorInclude,
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

  async getDoctorByService(serviceId: number) {
    const result = await this.prisma.doctor.findMany({
      where: {
        services: {
          some: {
            id: serviceId,
          },
        },
      },
      include: {
        services: true,
        address: true,
        education: true,
        experience: true,
        award: true,
        business_hour: true,
      },
    });
    return result;
  }

  async getDoctorAvailability(
    doctorId: number,
    serviceId: number,
    date?: string,
  ) {
    try {
      // 1. Load service
      const service = await this.prisma.service.findUnique({
        where: { id: serviceId },
      });
      if (!service) {
        throw new BadRequestException(`Service with ID ${serviceId} not found`);
      }
      const duration = service.duration; // minutes

      // 2. Load doctor business hour for that date (Mon, Tue...)
      const weekday = new Date(date || new Date()).toLocaleString('en-US', {
        weekday: 'long',
      });

      const businessHour = await this.prisma.business_hour.findFirst({
        where: {
          doctorId: doctorId,
          day: weekday,
          isClose: false,
        },
        include: {
          doctor: true,
        },
      });

      if (!businessHour) return { availableSlots: [] };

      // 3. Generate raw blocks
      const rawBlocks = this.generateRawBlocks(
        businessHour.open,
        businessHour.close,
        date || new Date().toISOString().split('T')[0],
      );

      // 4. Load existing appointments for that doctor/date
      const bookedSlots = await this.prisma.slot.findMany({
        where: {
          doctorId,
          date,
          isBooked: true,
        },
      });
      // 5. Remove blocked blocks
      const blocksAfterRemoval = this.removeBookedBlocks(
        rawBlocks,
        bookedSlots,
        date,
      );

      // 6. Merge blocks into service-duration slots
      // const finalSlots = this.mergeBlocksIntoSlots(
      //   blocksAfterRemoval,
      //   duration,
      // );
      const finalSlots = blocksAfterRemoval.filter((b) => b.isAvailable);

      // 7. Return clean response for frontend
      return {
        service: {
          id: service.id,
          name: service.name,
          duration: service.duration,
          fee: service.fee,
        },
        doctor: {
          id: businessHour.doctor.id,
          name: businessHour.doctor.name,
        },
        date,
        availableSlots: finalSlots.map((s) => ({
          start: s.start.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          end: s.end.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        })),
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Failed to fetch doctor availability',
      );
    }
  }
}
