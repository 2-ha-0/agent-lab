import { Test, TestingModule } from '@nestjs/testing';
import { ItemToolService } from './item-tool.service';

describe('ItemToolService', () => {
  let service: ItemToolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemToolService],
    }).compile();

    service = module.get<ItemToolService>(ItemToolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
