import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Types } from 'mongoose';
export class CreateAddressDto {
  @IsNotEmpty()
  studentId: Types.ObjectId;
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  correspondenseAddress: string;
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  permanentAddress: string;
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  state: string;
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  city: string;
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{6}$/, { message: 'Pincode must be exactly 6 digits' })
  pincode: string;
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  country: string;
}
