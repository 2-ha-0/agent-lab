import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { LlmModule } from 'src/llm/llm.module';
import { PromptModule } from 'src/prompt/prompt.module';
import { ToolsModule } from 'src/tools/tools.module';
import { RetrievalModule } from 'src/retrieval/retrieval.module';

@Module({
  controllers: [AgentController],
  providers: [AgentService],
  imports: [ToolsModule, LlmModule, PromptModule, RetrievalModule],
})
export class AgentModule {}
