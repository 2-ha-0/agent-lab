import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { LlmModule } from 'src/llm/llm.module';
import { ChampionModule } from 'src/champion/champion.module';
import { PromptModule } from 'src/prompt/prompt.module';

@Module({
  controllers: [AgentController],
  providers: [AgentService],
  imports: [ChampionModule, LlmModule, PromptModule],
})
export class AgentModule {}
