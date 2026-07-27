import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChampionService } from './champion.service';

@ApiTags('champions')
@Controller('champions')
export class ChampionController {
  constructor(private readonly championService: ChampionService) {}

  @Get()
  @ApiOperation({ summary: 'Get all champions, optionally filtered by cost' })
  @ApiQuery({ name: 'cost', required: false, type: Number })
  findAll(@Query('cost') cost?: string) {
    if (cost !== undefined) {
      return this.championService.findAllByCost(Number(cost));
    }
    return this.championService.findAll();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get champion by name' })
  findByName(@Param('name') name: string) {
    return this.championService.findByName(decodeURIComponent(name));
  }
}
