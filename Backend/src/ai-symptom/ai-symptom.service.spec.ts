import { Test, TestingModule } from '@nestjs/testing';
import { AiSymptomService } from './ai-symptom.service';

describe('AiSymptomService', () => {
  let service: AiSymptomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiSymptomService],
    }).compile();

    service = module.get<AiSymptomService>(AiSymptomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
