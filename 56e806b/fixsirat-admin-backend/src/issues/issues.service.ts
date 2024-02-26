import { Inject, Injectable, Logger } from '@nestjs/common';
import mongoose, { Model, PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue, IssueDocument, Severity } from '../schemas/issues.schema';
import { ImagesService } from '../images/images.service';
import { PaginationOptions } from 'src/interfaces/pagination-options.interface';
import { IssueFilters } from 'src/interfaces/issue-filters.interface';
import { ConfigService } from '@nestjs/config';
import { Image, ImageDocument } from '../schemas/images.schema';

@Injectable()
export class IssuesService {
  private readonly logger = new Logger(IssuesService.name);
  constructor(
    @InjectModel(Issue.name) private issueModel: PaginateModel<IssueDocument>,
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
    @Inject(ImagesService)
    private readonly imagesService: ImagesService,
    private configService: ConfigService,
  ) {}

  async create(createIssueDto: CreateIssueDto): Promise<Issue> {
    const severityLevel = Severity[createIssueDto.severity];
    const createdIssue = new this.issueModel({
      ...createIssueDto,
      severity: severityLevel,
    });

    return createdIssue.save();
  }

  getSortingCriteria(sort: string) {
    const sortingCriterias = {
      severity: { severity: 1 },
      dateTaken: { dateTaken: -1 },
      distance: { 'dist.calculated': 1 },
    };

    return sortingCriterias[sort];
  }

  async findAll(
    options: PaginationOptions,
    filters: IssueFilters,
    sort: string,
  ): Promise<any> {
    const { page, limit } = options;
    const { location, startDate, endDate, severity } = filters;

    const paginationOptions = {
      page,
      limit,
    };
    let query = this.issueModel.aggregate();
    if (location) {
      query = query.near({
        near: {
          type: 'Point',
          coordinates: location.coordinates,
        },
        distanceField: 'dist.calculated',
        maxDistance: location.distance,
        spherical: true,
      });
    }

    query = query.lookup({
      from: 'images',
      localField: '_id',
      foreignField: 'issueId',
      as: 'issueImages',
    });

    if (sort) {
      const sortingCriteria = this.getSortingCriteria(sort);
      if (sortingCriteria) {
        query = query.sort(sortingCriteria);
      }
    }

    if (startDate && endDate) {
      query = query.match({
        dateTaken: {
          $gte: startDate,
          $lte: endDate,
        },
      });
    } else if (startDate) {
      query = query.match({
        date_taken: {
          $gte: startDate,
        },
      });
    }
    if (severity) {
      query = query.match({ severity: Number(severity) });
    }

    const result = await query
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit)
      .exec();
    const totalResults = await query.count('totalCount');
    if (totalResults?.length) {
      return {
        data: result,
        totalResults: totalResults[0].totalCount,
        totalPages: Math.ceil(
          totalResults[0].totalCount / paginationOptions.limit,
        ),
        currentPage: paginationOptions.page,
        limit: paginationOptions.limit,
      };
    } else {
      return {
        data: result,
        totalResults: 0,
        totalPages: 0,
        currentPage: paginationOptions.page,
        limit: paginationOptions.limit,
      };
    }
  }

  async findAllByUsername(userName: string): Promise<Issue[]> {
    let query = this.issueModel.aggregate();

    query = query.lookup({
      from: 'images',
      localField: '_id',
      foreignField: 'issueId',
      as: 'issueImages',
    });
    query.match({ userName: userName });
    const issues = await query.exec();
    return issues;
  }

  async findById(id: string): Promise<Issue> {
    const query = this.issueModel.aggregate();

    query.lookup({
      from: 'images',
      localField: '_id',
      foreignField: 'issueId',
      as: 'issueImages',
    });

    query.match({ _id: new mongoose.Types.ObjectId(id) });

    const issues = await query.exec();
    return issues[0];
  }

  async update(id: string, updateIssueDto: UpdateIssueDto): Promise<Issue> {
    const severityLevel = Severity[updateIssueDto.severity];
    const updatedIssue = await this.issueModel
      .findByIdAndUpdate(
        id,
        { ...updateIssueDto, severity: severityLevel },
        { new: true },
      )
      .exec();
    updatedIssue.issueDescription =
      updateIssueDto.issueDescription !== undefined
        ? updateIssueDto.issueDescription
        : undefined;

    updatedIssue.fixTime = updateIssueDto.fixTime || updatedIssue.fixTime;

    updatedIssue.issueStatus =
      updateIssueDto.issueStatus || updatedIssue.issueStatus;

    updatedIssue.address =
      updateIssueDto.address !== undefined ? updateIssueDto.address : undefined;

    await updatedIssue.save();
    return updatedIssue;
  }

  async removeIssue(id: string) {
    return this.issueModel.findByIdAndDelete(id);
  }
}
