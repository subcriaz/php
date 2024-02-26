import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { getModelToken } from '@nestjs/mongoose';
import { Image } from '../schemas/images.schema';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        { provide: getModelToken(Image.name), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
