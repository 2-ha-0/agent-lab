import { Injectable } from '@nestjs/common';
import { Trait } from 'generated/prisma/enums';
import { TraitService } from 'src/trait/trait.service';
import { tool } from '@langchain/core/tools';
import z from 'zod/v3';

@Injectable()
export class TraitToolService {
  constructor(private readonly traitService: TraitService) {}

  getTools() {
    return [
      tool(
        async () => {
          return this.traitService.findAll();
        },
        {
          name: 'searchAllTraits',
          description: '모든 특성을 검색합니다.',
          schema: z.object({}),
        },
      ),
      tool(
        async ({ name }) => {
          return this.traitService.findByName(name);
        },
        {
          name: 'searchTraitsByName',
          description: '특성 이름을 기준으로 특성을 검색합니다.',
          schema: z.object({
            name: z.nativeEnum(Trait),
          }),
        },
      ),
    ];
  }
}
