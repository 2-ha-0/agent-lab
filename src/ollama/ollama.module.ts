import { Module } from '@nestjs/common';
import { OllamaService } from './ollama.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [OllamaService],
  exports: [OllamaService],
  imports: [HttpModule],
})
export class OllamaModule {}
