import { PartialType } from '@nestjs/mapped-types';
import { CreateIssueDto } from './create-issue.dto';
import { IsString, IsUrl, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { Severity, IssueStatus } from 'src/schemas/issues.schema';

export class UpdateIssueDto extends PartialType(CreateIssueDto) {
  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsEnum(Severity)
  @IsOptional()
  severity: Severity;

  @IsString()
  @IsOptional()
  @IsUrl()
  mapURL: string;

  @IsString()
  @IsOptional()
  issueDescription: string;

  @IsString()
  @IsOptional()
  issueType: string;

  @IsNumber()
  @IsOptional()
  fixTime: number;

  @IsEnum(IssueStatus)
  @IsOptional()
  issueStatus: IssueStatus;
}
