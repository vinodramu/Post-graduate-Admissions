import { IsString, IsDate, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  _id: string;

  @IsString()
  studentId: string;

  @IsString()
  correspondenseAddress: string;

  @IsString()
  permanentAddress: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsString()
  pincode: string;

  @IsString()
  country: string;

  @IsNumber()
  __v: number;
}

class ApplicationDto {
  @IsString()
  _id: string;

  @IsString()
  studentId: string;

  @IsString()
  status: string;

  @IsDate()
  submissionDate: Date;

  @IsString()
  courseId: string;

  @IsNumber()
  fee: number;

  @IsNumber()
  __v: number;
}

class EducationDetailDto {
  @IsString()
  levelOfEducation: string;

  @IsString()
  institution: string;

  @IsNumber()
  yearOfPassing: number;

  @IsString()
  percentage: string;

  @IsString()
  _id: string;
}

class EducationDto {
  @IsString()
  _id: string;

  @IsString()
  studentId: string;

  @IsArray()
  @Type(() => EducationDetailDto)
  education: EducationDetailDto[];

  @IsNumber()
  __v: number;
}

class DocumentDto {
  @IsString()
  _id: string;

  @IsString()
  studentId: string;

  @IsString()
  aadharPhoto: string;

  @IsString()
  studentPhoto: string;

  @IsString()
  signature: string;

  @IsString()
  graduationCertificate: string;

  @IsString()
  twelthCertificate: string;

  @IsString()
  tenthCertificate: string;

  @IsNumber()
  __v: number;
}

class StudentDto {
  @IsString()
  _id: string;

  @IsString()
  name: string;

  @IsDate()
  dateOfBirth: Date;

  @IsString()
  gender: string;

  @IsString()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsNumber()
  __v: number;

  @IsArray()
  @Type(() => AddressDto)
  address: AddressDto[];

  @IsArray()
  @Type(() => ApplicationDto)
  applications: ApplicationDto[];

  @IsArray()
  @Type(() => EducationDto)
  education: EducationDto[];

  @IsArray()
  @Type(() => DocumentDto)
  documents: DocumentDto[];
}

export class StudentsResponseDto {
  @IsArray()
  @Type(() => StudentDto)
  students: StudentDto[];
}
