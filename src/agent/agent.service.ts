import { Injectable } from '@nestjs/common';
import { LlmService } from 'src/llm/llm.service';
import { PromptService } from 'src/prompt/prompt.service';

@Injectable()
export class AgentService {
  constructor(
    private readonly llmService: LlmService,
    private readonly promptService: PromptService,
  ) {}

  async selectTool(question: string) {
    const prompt = this.promptService.buildSelectToolPrompt(question);
    const response = await this.llmService.generate(prompt);

    return response;
  }
}
