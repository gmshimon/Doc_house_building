import { BadRequestException, Injectable } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SlotsGeneratorService {
  constructor(private prisma: PrismaService) {}
  // Weekday mapping from JS (0–6) to your DB strings
  private dayMap = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  private getDoctorBusinessHour = async (doctorId: number) => {
    return await this.prisma.business_hour.findMany({
      where: { doctorId },
    });
  };

  private deleteUnBookedSlot = async (date) => {
    return await this.prisma.slot.deleteMany({
      where: {
        date: date.toString(),
        isBooked: false,
      },
    });
  };
  async generateSlotsForDoctor(doctorId: number) {
    try {
      const businessHours = await this.getDoctorBusinessHour(doctorId);

      if (businessHours.length === 0) {
        console.log('No business hours found for doctor:', doctorId);
        return;
      }

      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        0,
      );
      endDate.setHours(23, 59, 59, 999); // cover through end of current month

      let createdSlots = 0;

      // Loop day-by-day
      for (
        let date = new Date(startDate);
        date <= endDate;
        date.setDate(date.getDate() + 1)
      ) {
        const jsDay = date.getDay(); // 0–6
        const readableDay = this.dayMap[jsDay];

        // Find business hour entry for this weekday
        const bh = businessHours.find((b) => b.day === readableDay);

        if (!bh) continue; // doctor didn't set hours for this day
        if (bh.isClose) continue; // doctor is closed on this day

        // Build open/close datetime objects
        const [openHour, openMin] = bh.open.split(':').map(Number);
        const [closeHour, closeMin] = bh.close.split(':').map(Number);

        const openDateTime = new Date(date);
        openDateTime.setHours(openHour, openMin, 0, 0);

        const closeDateTime = new Date(date);
        closeDateTime.setHours(closeHour, closeMin, 0, 0);

        // Default consultation duration
        const DURATION = 30; // minutes

        // Generate intervals
        for (
          let current = new Date(openDateTime);
          current < closeDateTime;
          current = new Date(current.getTime() + DURATION * 60000)
        ) {
          // Check if slot already exists
          const existing = await this.prisma.slot.findFirst({
            where: {
              doctorId,
              date: current.toString(),
            },
          });

          if (existing) continue; // avoid duplicate slots

          // Insert new slot
          await this.prisma.slot.create({
            data: {
              doctorId,
              date: current.toString(),
              isBooked: false,
            },
          });

          createdSlots++;
        }
      }

      return {
        doctorId,
        createdSlots,
        message: 'Slot generation completed.',
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to generate slots');
    }
  }
  async generateSlotsForDateRange(
    doctorId: number,
    startDate: Date,
    endDate: Date,
  ) {
    const businessHours = await this.getDoctorBusinessHour(doctorId);

    if (!businessHours) {
      throw new BadRequestException(`Doctor with ID ${doctorId} not found`);
    }

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const weekday = this.dayMap[date.getDay()];
      const bh = businessHours.find((b) => b.day === weekday);

      if (!bh) {
        await this.deleteUnBookedSlot(date);
      }

      if (bh?.isClose === true) {
        await this.deleteUnBookedSlot(date);
      }
    }
  }
}
