import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Severity, IssueStatus } from '../../schemas/issues.schema';

export class CreateIssueDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsEnum(Severity)
  @IsNotEmpty()
  severity: Severity;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  mapURL: string;

  @IsString()
  @IsNotEmpty()
  issueType: string;

  @Transform(({ value }) => {
    return { type: value[0], coordinates: [value[1], value[2]] };
  })
  location: {
    type: string;
    coordinates: number[];
  };
  @IsEnum(IssueStatus)
  issueStatus: IssueStatus = IssueStatus.PENDING;
}
