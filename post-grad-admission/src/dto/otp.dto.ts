import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SendOtpDto {
  @IsNotEmpty()
  @IsPhoneNumber(null)
  readonly phone: string;
}
