import { Type } from 'class-transformer';
export class CreateEducationalDetailsDto {
  studentId: string;

  @Type(() => CreateEducationDto)
  education: CreateEducationDto[];
}

export class CreateEducationDto {
  levelOfEducation: string;
  institution: string;
  yearOfPassing: number;
  percentage: string;
}
