import { Module } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentController } from './agent.controller';
import { LlmModule } from 'src/llm/llm.module';
import { ToolsModule } from 'src/tools/tools.module';

@Module({
  controllers: [AgentController],
  providers: [AgentService],
  imports: [ToolsModule, LlmModule],
})
export class AgentModule {}
