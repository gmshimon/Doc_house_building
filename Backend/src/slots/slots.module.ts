import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { SlotsGeneratorService } from './slot.generator';

@Module({
  controllers: [SlotsController],
  providers: [SlotsService, SlotsGeneratorService],
})
export class SlotsModule {}
