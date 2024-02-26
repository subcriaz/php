import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  InternalServerErrorException,
  NotFoundException,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { ImagesService } from '../images/images.service';
import { CreateImageDto } from 'src/images/dto/create-image.dto';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Issue, IssueDocument } from 'src/schemas/issues.schema';
import { ConfigService } from '@nestjs/config';

@Controller('issues')
export class IssuesController {
  private readonly logger = new Logger(IssuesService.name);
  constructor(
    private readonly issuesService: IssuesService,
    private readonly imagesService: ImagesService,
    @InjectModel(Issue.name) private readonly issueModel: Model<IssueDocument>,
    private configService: ConfigService,
  ) {}

  @Post()
  async create(
    @Body() createIssueDto: CreateIssueDto,
    @Body() createImageDto: CreateImageDto,
  ) {
    try {
      const issue = await this.issuesService.create(createIssueDto);
      const image = await this.imagesService.create(createImageDto);
      if (!issue._id) throw new NotFoundException('Issue ID is empty');
      image.issueId = issue._id;
      await image.save();
      return new HttpException('issue created successfully', HttpStatus.OK);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(
        'Unable to create issue and image',
      );
    }
  }

  @Get()
  async findAll(@Query() query: any): Promise<any> {
    const issuesLimit = this.configService.get<number>('ISSUE_LIMIT_PER_PAGE');
    const page = query.page || 1;
    const limit = query.limit || issuesLimit;
    const location = query.location ? JSON.parse(query.location) : null;
    const startDate = query.startDate ? new Date(query.startDate) : null;
    const endDate = query.endDate ? new Date(query.endDate) : null;
    const severity = query.severity || null;
    const options = { page: parseInt(page), limit: parseInt(limit) };
    const filters = { location, startDate, endDate, severity };
    const sort = query.sort || 'severity';
    const issues = await this.issuesService.findAll(options, filters, sort);

    return issues;
  }

  @Get('/user/:userName')
  findAllByUserName(@Param('userName') userName: string) {
    return this.issuesService.findAllByUsername(userName);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.issuesService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIssueDto: UpdateIssueDto,
    @Body() createImageDto: CreateImageDto,
  ) {
    try {
      const issue = await this.issuesService.update(id, updateIssueDto);
      if (createImageDto.imageLink) {
        const image = await this.imagesService.create(createImageDto);
        if (!issue._id) throw new NotFoundException('Issue ID is empty');
        image.issueId = issue._id;
        await image.save();
      }
      return new HttpException('issue updated successfully', HttpStatus.OK);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(
        'Unable to update issue and create image',
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.issuesService.removeIssue(id);
  }
}
