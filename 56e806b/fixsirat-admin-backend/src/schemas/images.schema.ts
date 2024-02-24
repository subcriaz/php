import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Document } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    required: true,
    ref: 'Issue',
  })
  issueId: MongooseSchema.Types.ObjectId;

  @Prop({ required: false })
  imageLink: string;

  @Prop({ default: false, required: false })
  get _isBefore(): boolean {
    return this.dateTaken < new Date();
  }

  @Prop({ default: false, required: false })
  get _isAfter(): boolean {
    return this.dateTaken > new Date();
  }
  @Prop({ default: Date.now, required: true })
  dateTaken: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
