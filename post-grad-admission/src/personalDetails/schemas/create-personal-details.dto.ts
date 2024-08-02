import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class CreatePersonalDetailsDto {
  @IsString()
  @Length(1, 100)
  name: string;
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;
  @IsString()
  @Length(1, 10)
  gender: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber(null)
  phoneNumber: string;
}
