import { ApiProperty } from '@nestjs/swagger';

export class generateChatDto {
  @ApiProperty({
    description: '인덱싱할 텍스트',
    example: 'hello world',
  })
  prompt!: string;
}
