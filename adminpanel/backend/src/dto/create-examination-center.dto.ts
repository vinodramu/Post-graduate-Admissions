import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateExaminationCenterDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly location: string;

    @IsNumber()
    @IsOptional()
    readonly capacity?: number;

    @IsString()
    @IsOptional()
    readonly contactNumber?: string;
}
