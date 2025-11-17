import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SlotsGeneratorService {
  constructor(private prisma: PrismaService) {}
  async generateSlotsForDoctor(doctorId: number) {
    try {
      const doctorBusinessHours = await this.prisma.business_hour.findMany({
        where: { doctorId },
      });

      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 30); // Generate slots for the next 30 days

      


      return doctorBusinessHours;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to generate slots');
    }
  }
}
