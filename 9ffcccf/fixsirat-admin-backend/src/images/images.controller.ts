import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { multerConfig } from 'src/config/multer-config';
import { imageFileFilter } from '../utils/file-upload.utils';
import { Image, ImageDocument } from '../schemas/images.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Controller('images')
export class ImagesController {
  private readonly logger = new Logger(ImagesService.name);
  constructor(
    private readonly imagesService: ImagesService,
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
  ) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.imagesService.findById(id);
  }

  @Get('issue/:issueId')
  async getImagesByIssueId(
    @Param('issueId') issueId: string,
  ): Promise<Image[]> {
    const objectId = new Types.ObjectId(issueId);
    const images = await this.imageModel.find({ issueId: objectId }).exec();
    return images;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('data', { ...multerConfig, fileFilter: imageFileFilter }),
  )
  async uploadFile(@Body() body: { file: string }, @Req() req: Request) {
    return this.imagesService.writeFile(body, req);
  }
}
