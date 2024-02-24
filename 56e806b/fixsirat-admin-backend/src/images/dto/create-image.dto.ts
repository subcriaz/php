import { IsString, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateImageDto {
  @IsOptional()
  @IsString()
  imageLink: string;

  @IsOptional()
  issueId: ObjectId;
}
