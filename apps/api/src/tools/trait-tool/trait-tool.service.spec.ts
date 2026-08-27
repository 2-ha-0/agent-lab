import { Test, TestingModule } from '@nestjs/testing';
import { TraitToolService } from './trait-tool.service';

describe('TraitToolService', () => {
  let service: TraitToolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TraitToolService],
    }).compile();

    service = module.get<TraitToolService>(TraitToolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
