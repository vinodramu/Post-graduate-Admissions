import { IsString, IsNumber, IsEnum } from 'class-validator';

export class CreateDashboardDto {
    @IsString()
    readonly program: string;

    @IsNumber()
    readonly totalStudents: number;

    @IsNumber()
    readonly totalApplications: number;

    @IsEnum(['Open', 'Closed'])
    readonly admissionStatus: string;

    readonly createdAt?: Date;
}
