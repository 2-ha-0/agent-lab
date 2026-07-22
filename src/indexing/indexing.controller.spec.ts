import { Test, TestingModule } from '@nestjs/testing';
import { IndexingController } from './indexing.controller';
import { IndexingService } from './indexing.service';

describe('IndexingController', () => {
  let controller: IndexingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndexingController],
      providers: [IndexingService],
    }).compile();

    controller = module.get<IndexingController>(IndexingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
