import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { Issue, IssueSchema } from '../schemas/issues.schema';
import { ImagesModule } from 'src/images/images.module';
import { Image, ImageSchema } from 'src/schemas/images.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Issue.name, schema: IssueSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    ImagesModule,
  ],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}
