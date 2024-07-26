import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateStudentVerificationDto {
  @IsString()
  readonly studentId: string;

  @IsEnum(['Verified', 'Pending', 'Rejected'])
  readonly verificationStatus: string;

  @IsOptional()
  @IsString()
  readonly remarks?: string;

  @IsOptional()
  @IsString()
  readonly verifiedBy?: string;

  @IsOptional()
  readonly verifiedAt?: Date;
}
