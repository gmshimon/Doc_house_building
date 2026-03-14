import { Test, TestingModule } from '@nestjs/testing';
import { AiSymptomController } from './ai-symptom.controller';
import { AiSymptomService } from './ai-symptom.service';

describe('AiSymptomController', () => {
  let controller: AiSymptomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiSymptomController],
      providers: [AiSymptomService],
    }).compile();

    controller = module.get<AiSymptomController>(AiSymptomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
