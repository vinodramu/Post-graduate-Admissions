// create-registration.dto.ts
export class EducationDto {
  levelOfEducation: string;
  institution: string;
  yearOfPassing: number;
  percentage: string;
}

export class CreateRegistrationDto {
  name: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  phoneNumber: string;
  correspondenseAddress: string;
  permanentAddress: string;
  state: string;
  city: string;
  pincode: string;
  country: string;
  education: EducationDto[]; // Array to hold multiple education records
  aadharPhoto: string;
  studentPhoto: string;
  signature: string;
  graduationCertificate: string;
  twelthCertificate: string;
  tenthCertificate: string;
  status: string;
  submissionDate: Date;
  collegeId: string;
  courseId: string;
  examCenterAllotment: string;
  roomAllotment: string;
  fee: number;
}
