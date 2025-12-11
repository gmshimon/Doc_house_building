/* eslint-disable no-useless-catch */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationQueue } from '../notification/notification.queue';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService,
    private notificationQueue: NotificationQueue,
  ) {}

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

      const openTime24 = this.to24Hour(businessHour.open);
      const closeTime24 = this.to24Hour(businessHour.close);
      const slotStartTime24 = this.to24Hour(startTime);
      const slotEndTime24 = this.to24Hour(endTime);

      // check time range
      const open = new Date(`${date}T${openTime24}:00`);
      const close = new Date(`${date}T${closeTime24}:00`);
      const slotStart = new Date(`${date}T${slotStartTime24}:00`);
      const slotEnd = new Date(`${date}T${slotEndTime24}:00`);

      if (slotStart < open || slotEnd > close) {
        throw new BadRequestException("Slot is outside doctor's working hours");
      }
      // OPTIONAL: Validate the service duration matches 1 hour
      //   const serviceDuration = 60; // your system uses 1 hour blocks
      //   const requestedDuration =
      //     (slotEnd.getTime() - slotStart.getTime()) / 60000;

      //   if (requestedDuration !== serviceDuration) {
      //     throw new BadRequestException(
      //       'Service duration does not match the slot length',
      //     );
      //   }

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
          doctor: {
            include: { address: true },
          },
          slot: true,
          service: true,
        },
      });

      const doctorAddress = (() => {
        const addr = appointment.doctor.address;
        if (!addr) return undefined;
        const parts = [
          addr.street,
          addr.city,
          addr.state,
          addr.zip,
          addr.country,
        ].filter(Boolean);
        return parts.join(', ') || undefined;
      })();

      await this.notificationQueue.enqueueAppointmentEmails({
        appointmentId: appointment.id,
        doctorName: appointment.doctor.name,
        doctorEmail: appointment.doctor.email,
        doctorAddress,
        patientName: appointment.user.name,
        patientEmail: appointment.user.email,
        patientPhone: appointment.user.phone,
        serviceName: appointment.service.name,
        slotDate: appointment.slot.date,
        slotStart: appointment.slot.startTime,
        slotEnd: appointment.slot.endTime,
        reason: appointment.reason,
      });

      // Schedule reminder 24 hours before appointment start (defaults to 09:00 if no start time)
      const startTime24 = this.to24Hour(appointment.slot.startTime) ?? '09:00';
      const reminderTime = new Date(`${appointment.slot.date}T${startTime24}`);
      reminderTime.setHours(reminderTime.getHours() - 24);

      await this.notificationQueue.enqueueReminderEmails(
        {
          appointmentId: appointment.id,
          doctorName: appointment.doctor.name,
          doctorEmail: appointment.doctor.email,
          doctorAddress,
          patientName: appointment.user.name,
          patientEmail: appointment.user.email,
          patientPhone: appointment.user.phone,
          serviceName: appointment.service.name,
          slotDate: appointment.slot.date,
          slotStart: appointment.slot.startTime,
          slotEnd: appointment.slot.endTime,
          reason: appointment.reason,
        },
        reminderTime.toISOString(),
      );
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
        doctor: {
          select: {
            id: true,
            address: true,
            name: true,
            email: true,
            image: true,
            specialties: true,
          },
        },
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
        address: a.doctor.address,
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

  async checkUserBooking(
    userId: number,
    doctorId: number,
    serviceId: number,
    date: string,
  ) {
    // 1. Find appointment by user + doctor + service + date
    const appointment = await this.prisma.appointment.findFirst({
      where: {
        userId,
        doctorId,
        serviceId,
        slot: {
          date: date, // slot.date in your schema is a string
        },
      },
      include: {
        slot: true,
        doctor: true,
        service: true,
      },
    });

    // 2. If found, return "already booked"
    if (appointment) {
      return {
        isBooked: true,
        message: `You already booked an appointment with Dr. ${appointment.doctor.name} for ${appointment.service.name} on ${appointment.slot.date}.`,
        appointment: {
          appointmentId: appointment.id,
          date: appointment.slot.date,
          startTime: appointment.slot.startTime,
          endTime: appointment.slot.endTime,
          status: appointment.status,
        },
      };
    }

    // 3. If not found, return "not booked"
    return {
      isBooked: false,
      message: 'No appointment found. You can proceed with booking.',
    };
  }

  private to24Hour(time?: string | null): string | undefined {
    if (!time) return undefined;
    const trimmed = time.trim();
    const match = trimmed.match(/^(\d{1,2}):(\d{2})(?:\s*([AP]M))?$/i);
    if (!match) return trimmed;

    let hour = Number(match[1]);
    const minutes = match[2];
    const meridiem = match[3]?.toUpperCase();

    if (meridiem === 'AM') {
      if (hour === 12) hour = 0;
    } else if (meridiem === 'PM') {
      if (hour !== 12) hour += 12;
    }

    const hourStr = hour.toString().padStart(2, '0');
    return `${hourStr}:${minutes}`;
  }
}
