import { IsString, IsEmail, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly _id: string;

    @IsString()
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly phone: string;

    @IsString()
    readonly password: string;

    @IsBoolean()
    readonly phoneVerified: boolean;
}
