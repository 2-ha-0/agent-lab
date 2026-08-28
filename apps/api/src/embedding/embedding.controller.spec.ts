import { Test, TestingModule } from '@nestjs/testing';
import { EmbeddingService } from './embedding.service';
import { EmbeddingController } from './embedding.controller';

describe('EmbeddingController', () => {
  let controller: EmbeddingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmbeddingController],
      providers: [
        {
          provide: EmbeddingService,
          useValue: { embedding: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<EmbeddingController>(EmbeddingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
