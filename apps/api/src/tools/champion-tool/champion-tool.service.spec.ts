import { Test, TestingModule } from '@nestjs/testing';
import { ChampionToolService } from './champion-tool.service';

describe('ChampionToolService', () => {
  let service: ChampionToolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChampionToolService],
    }).compile();

    service = module.get<ChampionToolService>(ChampionToolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
