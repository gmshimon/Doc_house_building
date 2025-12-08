/* eslint-disable no-useless-catch */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async createAppointment(userId: number, dto: CreateAppointmentDto) {
    try {
      const { doctorId, serviceId, date, startTime, endTime, reason } = dto;

      // 1. Validate doctor
      const doctor = await this.prisma.doctor.findUnique({
        where: { id: doctorId },
      });
      if (!doctor) throw new BadRequestException('Doctor not found');

      // 2. Validate user
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new BadRequestException('User not found');

      // 3. Validate service
      const service = await this.prisma.service.findUnique({
        where: { id: serviceId },
      });
      if (!service) throw new BadRequestException('Service not found');

      // 4. Check if the slot is *already* booked (DB-level validation)
      const existingSlot = await this.prisma.slot.findFirst({
        where: {
          doctorId,
          date,
          startTime,
          endTime,
          isBooked: true,
        },
      });
      if (existingSlot) {
        throw new ConflictException(
          'This slot is already booked by someone else',
        );
      }

      // 5. Validate the slot falls inside doctor's business hours
      const weekday = new Date(date).toLocaleString('en-US', {
        weekday: 'long',
      });
      const businessHour = await this.prisma.business_hour.findFirst({
        where: { doctorId, day: weekday, isClose: false },
      });

      if (!businessHour) {
        throw new BadRequestException('Doctor is not available on this date');
      }

      // check time range
      const open = new Date(`${date}T${businessHour.open}:00`);
      const close = new Date(`${date}T${businessHour.close}:00`);
      const slotStart = new Date(`${date}T${startTime}:00`);
      const slotEnd = new Date(`${date}T${endTime}:00`);

      if (slotStart < open || slotEnd > close) {
        throw new BadRequestException("Slot is outside doctor's working hours");
      }
      // OPTIONAL: Validate the service duration matches 1 hour
      const serviceDuration = 60; // your system uses 1 hour blocks
      const requestedDuration =
        (slotEnd.getTime() - slotStart.getTime()) / 60000;

      if (requestedDuration !== serviceDuration) {
        throw new BadRequestException(
          'Service duration does not match the slot length',
        );
      }

      // 6. Create Slot (booked)
      const newSlot = await this.prisma.slot.create({
        data: {
          doctorId,
          serviceId,
          date,
          startTime,
          endTime,
          isBooked: true,
        },
      });

      // 7. Create Appointment
      const appointment = await this.prisma.appointment.create({
        data: {
          doctorId,
          userId,
          serviceId,
          reason,
          slotId: newSlot.id,
          status: 'CONFIRMED',
        },
        include: {
          user: true,
          doctor: true,
          slot: true,
          service: true,
        },
      });
      return appointment;
    } catch (error) {
      throw error;
    }
  }

  async getUserAppointments(userId: number) {
    // 1. Validate user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');

    // 2. Fetch all user appointments
    const appointments = await this.prisma.appointment.findMany({
      where: { userId },
      include: {
        doctor: true,
        service: true,
        slot: true,
      },
      orderBy: {
        slot: { date: 'asc' },
      },
    });
    // 3. Format response (optional, but nicer)
    return appointments.map((a) => ({
      appointmentId: a.id,
      status: a.status,
      reason: a.reason,
      doctor: {
        id: a.doctor.id,
        name: a.doctor.name,
        email: a.doctor.email,
        image: a.doctor.image,
        specialties: a.doctor.specialties,
      },
      service: {
        id: a.service.id,
        name: a.service.name,
        duration: a.service.duration,
        fee: a.service.fee,
      },
      slot: {
        date: a.slot.date,
        startTime: a.slot.startTime,
        endTime: a.slot.endTime,
      },
    }));
  }
}
