import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

// Update DTO for Educational Details
export class UpdateEducationalDetailsDto {
  @IsOptional()
  @IsString()
  studentId?: string;

  @Type(() => UpdateEducationDto)
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  education?: UpdateEducationDto[];
}

// Update DTO for individual Education entry
export class UpdateEducationDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  levelOfEducation?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  institution?: string;

  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  yearOfPassing?: number;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  percentage?: string;
}
