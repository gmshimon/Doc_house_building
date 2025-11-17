import { Controller, Post, Req, Res } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsGeneratorService } from './slot.generator';
import { type Request, type Response } from 'express';

@Controller('slots')
export class SlotsController {
  constructor(
    private readonly slotsService: SlotsService,
    private readonly SlotsGeneratorService: SlotsGeneratorService,
  ) {}
@Post()
  async createSlots(@Req() request: Request, @Res() response: Response) {
    try {
      const slots = await this.SlotsGeneratorService.generateSlotsForDoctor(6);

      response.status(200).json({
        status: 'success',
        message: 'Slots generated successfully',
        data: slots,
      });
    } catch (error) {
      response.status(400).json({
        status: 'failed',
        message: 'Error generating slots',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: error.message,
      });
    }
  }
}
