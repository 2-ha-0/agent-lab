import { ApiProperty } from '@nestjs/swagger';

export class RetrievalDto {
  @ApiProperty({
    description: '검색 쿼리',
    example: 'hello world',
  })
  query!: string;
}
