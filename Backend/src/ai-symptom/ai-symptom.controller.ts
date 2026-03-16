import { Controller, Req, Res, Post, Body, UseGuards } from '@nestjs/common';
import { AiSymptomService } from './ai-symptom.service';
import { AnalyzeSymptomDto } from './dto/analyze-symptom.dto';
import type { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { CustomThrottlerGuard } from '../custom-throttler.guard';
@Controller('ai-symptom')
export class AiSymptomController {
  constructor(private readonly aiSymptomService: AiSymptomService) {}

  @Post('/analyze')
  @UseGuards(AuthGuard('jwt'), CustomThrottlerGuard)
  @Throttle({
    default: {
      limit: 5,
      ttl: Number(process.env.TTL) || 60000,
    },
  })
  async analyzeSymptom(
    @Req() request: Request,
    @Res() response: Response,
    @Body() data: AnalyzeSymptomDto,
  ) {
    try {
      console.log('Received symptom analysis request:')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await this.aiSymptomService.analyzeSymptom(data);
      response.status(200).json({
        status: 'success',
        message: 'Symptom analysis successful',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: result,
      });
    } catch (error) {
      console.error('Error analyzing symptom:', error);
      response.status(500).json({
        status: 'failed',
        message: 'An error occurred while analyzing the symptom',
      });
    }
  }
}
