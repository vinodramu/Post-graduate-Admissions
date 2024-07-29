import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsDate,
  IsMongoId,
  IsPositive,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { CreateApplicationDto } from './create-application.dto';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
  @IsMongoId()
  @IsOptional()
  studentId?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsDate()
  @IsOptional()
  submissionDate?: Date;

  @IsMongoId()
  @IsOptional()
  courseId?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  fee?: number;
}
