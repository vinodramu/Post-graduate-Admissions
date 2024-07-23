import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';

export class UpdateAdminDto {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsEmail()
    readonly email?: string;

    @IsOptional()
    @IsString()
    readonly password?: string;

    @IsOptional()
    @IsEnum(['Admin'])
    readonly roles?: string[];
}
