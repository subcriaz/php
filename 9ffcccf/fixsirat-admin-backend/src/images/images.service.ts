import { Body, Injectable, Req } from '@nestjs/common';
import { Image, ImageDocument } from '../schemas/images.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import * as sharp from 'sharp';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
    private configService: ConfigService,
  ) {}

  async create(@Body() createImageDto: any) {
    const { issueId, imageLink } = createImageDto;
    const objectId = new Types.ObjectId(issueId);
    const createdImage = new this.imageModel({
      issueId: objectId,
      imageLink,
    });
    return createdImage.save();
  }

  async findAll(): Promise<Image[]> {
    return this.imageModel.find().exec();
  }

  async findById(id: string): Promise<Image> {
    return this.imageModel.findById(id).exec();
  }

  remove(id: string) {
    return this.imageModel.deleteOne({ id });
  }

  async writeFile(@Body() body: { file: string }, @Req() req: Request) {
    const base64Data = body.file.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const targetWidth = this.configService.get<string>('IMAGE_RESIZE_WIDTH');
    const resizedBuffer = await sharp(buffer)
      .resize({ width: Number(targetWidth) })
      .webp({ lossless: true, force: true })
      .toBuffer();
    const fileName = `issue-${Date.now()}.webp`;
    const filePath = `./uploads/${fileName}`;
    this.logger.log(fileName);

    if (!fs.existsSync('./uploads')) {
      fs.mkdirSync('./uploads');
    }

    fs.writeFileSync(filePath, resizedBuffer);

    const serverUrl = this.configService.get<string>('SERVER_URL');
    return { url: `${serverUrl}/${fileName}` };
  }
}
