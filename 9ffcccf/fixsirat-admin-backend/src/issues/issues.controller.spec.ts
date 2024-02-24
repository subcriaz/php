import { Test, TestingModule } from '@nestjs/testing';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { getModelToken } from '@nestjs/mongoose';
import { Issue } from '../schemas/issues.schema';
import { ImagesService } from '../images/images.service';
import { Image } from '../schemas/images.schema';

describe('IssuesController', () => {
  let controller: IssuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IssuesController],
      providers: [
        IssuesService,
        ImagesService,
        { provide: getModelToken(Issue.name), useValue: jest.fn() },
        { provide: getModelToken(Image.name), useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<IssuesController>(IssuesController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
