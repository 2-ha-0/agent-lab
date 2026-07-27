import { ApiProperty } from '@nestjs/swagger';

export class SelectToolDto {
  @ApiProperty({
    description: '질문',
    example: '4코스트 챔피언 알려줘',
  })
  question!: string;
}
