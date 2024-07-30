import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsMongoId,
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
  @IsOptional()
  submissionDate?: Date;

  @IsMongoId()
  @IsNotEmpty()
  courseId: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  fee: number;
}
