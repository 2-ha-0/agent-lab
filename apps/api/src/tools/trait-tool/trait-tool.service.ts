import { Injectable } from '@nestjs/common';
import { Trait } from 'generated/prisma/enums';
import { TraitService } from 'src/trait/trait.service';
import { Tool } from '../interfaces/tool.interface';

@Injectable()
export class TraitToolService {
  constructor(private readonly traitService: TraitService) {}

  getTools(): Tool[] {
    return [
      {
        name: 'searchAll',
        description: 'Search all traits',
        parameters: {},
        execute: () => this.traitService.findAll(),
      },
      {
        name: 'searchByName',
        description: 'Search traits by name',
        parameters: {
          name: 'string',
        },
        execute: ({ name }: { name: Trait }) =>
          this.traitService.findByName(name),
      },
    ];
  }
}
