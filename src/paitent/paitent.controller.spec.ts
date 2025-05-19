import { Test, TestingModule } from '@nestjs/testing';
import { PaitentController } from './paitent.controller';

describe('PaitentController', () => {
  let controller: PaitentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaitentController],
    }).compile();

    controller = module.get<PaitentController>(PaitentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
