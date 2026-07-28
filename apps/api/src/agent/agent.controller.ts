import { Controller, Post } from '@nestjs/common';
import { AgentService } from './agent.service';
import { Body } from '@nestjs/common';
import { SelectToolDto } from './dto/select-tool.dto';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post('select-tool')
  async selectTool(@Body() body: SelectToolDto) {
    return this.agentService.test(body.question);
  }
}
