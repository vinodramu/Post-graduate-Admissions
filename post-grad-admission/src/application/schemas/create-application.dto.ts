import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  studentId: string;
  @IsString()
  @IsNotEmpty()
  status: string;
  @IsDateString()
  @IsOptional()
  submissionDate: Date;
  @IsNotEmpty()
  courseId: string;
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  fee: number;
}
