import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
export class CreateEducationalDetailsDto {
  @IsNotEmpty()
  studentId: string;

  @Type(() => CreateEducationDto)
  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  education: CreateEducationDto[];
}

export class CreateEducationDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  levelOfEducation: string;
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  institution: string;
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  @IsNotEmpty()
  yearOfPassing: number;
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  percentage: string;
}
