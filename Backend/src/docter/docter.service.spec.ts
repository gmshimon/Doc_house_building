import { Test, TestingModule } from '@nestjs/testing';
import { DocterService } from './docter.service';

describe('DocterService', () => {
  let service: DocterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocterService],
    }).compile();

    service = module.get<DocterService>(DocterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
