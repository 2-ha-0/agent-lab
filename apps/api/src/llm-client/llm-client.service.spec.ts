import { Test, TestingModule } from '@nestjs/testing';
import { LlmClientService } from './llm-client.service';

describe('LlmClientService', () => {
  let service: LlmClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LlmClientService],
    }).compile();

    service = module.get<LlmClientService>(LlmClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
