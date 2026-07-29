import { Injectable } from '@nestjs/common';
import { Trait } from 'generated/prisma/enums';
import { TraitService } from 'src/trait/trait.service';

@Injectable()
export class TraitToolService {
  constructor(private readonly traitService: TraitService) {}

  searchAll() {
    return this.traitService.findAll();
  }

  searchByName(name: Trait) {
    return this.traitService.findByName(name);
  }
}
