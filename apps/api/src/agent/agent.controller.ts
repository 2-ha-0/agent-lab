import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AgentService } from './agent.service';
import { AgentQuestionDto } from './dto/agent-question.dto';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get('graph')
  @Header('Content-Type', 'text/plain; charset=utf-8')
  @ApiOperation({ summary: '에이전트 LangGraph를 Mermaid로 반환' })
  async getGraph() {
    return this.agentService.getGraph();
  }

  @Post('run')
  @ApiOperation({ summary: '에이전트 실행' })
  async run(@Body() body: AgentQuestionDto) {
    return this.agentService.run(body.question);
  }

  @Post('trace')
  @ApiOperation({ summary: '이번 질문이 지나간 경로를 Mermaid로 반환' })
  trace(@Body() body: AgentQuestionDto) {
    return this.agentService.trace(body.question);
  }
}
