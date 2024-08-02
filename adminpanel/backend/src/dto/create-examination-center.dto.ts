import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateExaminationCenterDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly city: string;

    @IsNumber()
    @IsOptional()
    readonly capacity?: number;
}
