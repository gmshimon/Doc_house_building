import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AiSymptomService } from './ai-symptom.service';
import { AnalyzeSymptomDto } from './dto/analyze-sumptom.dto';
import type { Request, Response } from 'express';
@Controller('ai-symptom')
export class AiSymptomController {
  constructor(private readonly aiSymptomService: AiSymptomService) {}

  @Post('/analyze')
  async analyzeSymptom(
    @Req() request: Request,
    @Res() response: Response,
    @Body() data: AnalyzeSymptomDto,
  ) {
    try {
      const result = await this.aiSymptomService.analyzeSymptom(data);
      response.status(200).json({
        status: 'success',
        message: 'Symptom analysis successful',
        data: result,
      });
    } catch (error) {
      response.status(500).json({
        status: 'failed',
        message: 'An error occurred while analyzing the symptom',
      });
    }
  }
}
