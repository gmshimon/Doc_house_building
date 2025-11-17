import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SlotsService {
  constructor(private prisma: PrismaService) {}
  async getDoctorSlots(doctorId: number) {
    const slots = await this.prisma.slot.findMany({
      where: { doctorId },
    });
    return slots;
  }
}
