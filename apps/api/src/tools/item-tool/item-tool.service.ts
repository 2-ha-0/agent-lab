import { Injectable } from '@nestjs/common';
import { ItemType } from 'generated/prisma/enums';
import { ItemService } from 'src/item/item.service';
import { toToolContent } from 'src/tools/to-tool-content';
import { tool } from '@langchain/core/tools';
import z from 'zod/v3';

@Injectable()
export class ItemToolService {
  constructor(private readonly itemService: ItemService) {}

  getTools() {
    return [
      tool(
        async ({ name }) => {
          return toToolContent(await this.itemService.findByName(name));
        },
        {
          name: 'searchItemsByName',
          description: '이름을 기준으로 아이템을 검색합니다.',
          schema: z.object({
            name: z.string(),
          }),
        },
      ),
      tool(
        async ({ type }) => {
          return toToolContent(await this.itemService.findByType(type));
        },
        {
          name: 'searchItemsByType',
          description: '타입을 기준으로 아이템을 검색합니다.',
          schema: z.object({
            type: z.nativeEnum(ItemType),
          }),
        },
      ),
      tool(
        async () => {
          return toToolContent(await this.itemService.findByAD());
        },
        {
          name: 'searchItemsByAD',
          description: 'AD 아이템을 검색합니다.',
          schema: z.object({}),
        },
      ),
      tool(
        async () => {
          return toToolContent(await this.itemService.findByAP());
        },
        {
          name: 'searchItemsByAP',
          description: 'AP 아이템을 검색합니다.',
          schema: z.object({}),
        },
      ),
      tool(
        async () => {
          return toToolContent(await this.itemService.findAll());
        },
        {
          name: 'searchAllItems',
          description: '모든 아이템을 검색합니다.',
          schema: z.object({}),
        },
      ),
    ];
  }
}
