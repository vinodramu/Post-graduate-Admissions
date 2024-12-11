
// src/applications/dto/create-applications.dto.ts
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateApplicationsDto {
  @IsNotEmpty()
  studentId: string;

  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApplicationDto)
  application: ApplicationDto[];
}


export class ApplicationDto {
  @IsNotEmpty()
  courseId: string;

}
