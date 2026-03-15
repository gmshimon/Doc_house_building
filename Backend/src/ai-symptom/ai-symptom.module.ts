import { Module } from '@nestjs/common';
import { AiSymptomService } from './ai-symptom.service';
import { AiSymptomController } from './ai-symptom.controller';
import { OpenrouterModule } from 'src/openrouter/openrouter.module';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [OpenrouterModule, ServicesModule],
  controllers: [AiSymptomController],
  providers: [AiSymptomService],
})
export class AiSymptomModule {}
