import { ApiProperty } from '@nestjs/swagger';

export class IndexingDto {
  @ApiProperty({
    description: '인덱싱할 텍스트',
    example: 'hello world',
  })
  text!: string;
}
