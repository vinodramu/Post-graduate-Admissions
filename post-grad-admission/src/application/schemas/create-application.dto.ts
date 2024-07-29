import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsPositive,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsDate()
  submissionDate: Date;

  @IsNotEmpty()
  courseId: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  fee: number;
}
