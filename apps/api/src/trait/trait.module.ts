import { Module } from '@nestjs/common';
import { TraitService } from './trait.service';

@Module({
  providers: [TraitService],
  exports: [TraitService],
})
export class TraitModule {}
