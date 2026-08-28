import { Test, TestingModule } from '@nestjs/testing';
import { PromptService } from 'src/prompt/prompt.service';
import { LlmService } from './llm.service';

describe('LlmService', () => {
  let service: LlmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LlmService,
        {
          provide: PromptService,
          useValue: {
            buildSelectToolsPrompt: jest.fn(),
            buildAnswerPrompt: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LlmService>(LlmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
