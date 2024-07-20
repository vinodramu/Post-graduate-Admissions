import { IsNotEmpty, IsEmail, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber(null)
  readonly phone: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly confirmpassword: string;
}
