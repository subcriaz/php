import { Test, TestingModule } from '@nestjs/testing';
import { IssuesService } from './issues.service';
import { getModelToken } from '@nestjs/mongoose';
import { Issue } from '../schemas/issues.schema';

describe('IssuesService', () => {
  let service: IssuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IssuesService,

        { provide: getModelToken(Issue.name), useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<IssuesService>(IssuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
