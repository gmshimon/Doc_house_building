import { Test, TestingModule } from '@nestjs/testing';
import { DocterController } from './docter.controller';
import { DocterService } from './docter.service';

describe('DocterController', () => {
  let controller: DocterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocterController],
      providers: [DocterService],
    }).compile();

    controller = module.get<DocterController>(DocterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
