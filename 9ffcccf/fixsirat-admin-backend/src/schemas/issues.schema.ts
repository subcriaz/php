import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
export type IssueDocument = HydratedDocument<Issue>;

enum Severity {
  Low = 1,
  Medium = 2,
  High = 3,
}
enum IssueStatus {
  PENDING = 'Pending',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed',
}

@Schema()
export class Issue extends Document {
  @Prop({ required: true })
  reporter: string;

  @Prop({ required: true })
  userName: string;

  @Prop()
  address: string;

  @Prop({ required: true })
  issueType: string;

  @Prop({ required: true, index: true, type: Number, enum: Severity })
  severity: number;

  @Prop({ default: Date.now, required: true })
  dateTaken: Date;

  @Prop({ required: true })
  mapURL: string;

  @Prop({
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (value: number[]) => {
          return (
            value.length === 2 &&
            value.every((coord: number) => coord >= -180 && coord <= 180)
          );
        },
        message:
          'Location field must be an array of 2 numbers representing longitude and latitude respectively, with values ranging from -180 to 180',
      },
    },
  })
  location: {
    type: string;
    coordinates: [number, number];
  };

  @Prop()
  issueDescription: string;

  @Prop()
  fixTime: number;

  @Prop({ enum: IssueStatus, default: IssueStatus.PENDING })
  issueStatus: string;
}
export const IssueSchema = SchemaFactory.createForClass(Issue);
export { Severity, IssueStatus };
IssueSchema.plugin(mongoosePaginate);
