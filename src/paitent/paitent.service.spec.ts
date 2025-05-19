import { Test, TestingModule } from '@nestjs/testing';
import { PaitentService } from './paitent.service';

describe('PaitentService', () => {
  let service: PaitentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaitentService],
    }).compile();

    service = module.get<PaitentService>(PaitentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
