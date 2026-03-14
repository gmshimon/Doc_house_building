import { Injectable } from '@nestjs/common';
import { OpenrouterService } from 'src/openrouter/openrouter.service';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AiSymptomService {
  constructor(
    // private readonly openrouterService: OpenrouterService,
    private readonly prisma: PrismaService,
  ) {}
  async analyzeSymptom(data: any): Promise<any> {
    return 'hello';
  }
}
