import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class StudentReport {
    @Prop({ required: true })
    reportType: string;  // e.g., 'Total Students', 'Subject-wise', 'Category-wise'

    @Prop({ required: true })
    reportDate: Date;

    @Prop({ required: true })
    totalStudents: number;

    @Prop()
    programWise?: Record<string, number>;  // Key: Program Name, Value: Number of Students

    @Prop()
    categoryWise?: Record<string, number>;  // Key: Category, Value: Number of Students

    @Prop()
    inServiceCount?: number;

    @Prop()
    exServiceCount?: number;

    @Prop()
    subjectWise?: Record<string, number>;  // Key: Subject, Value: Number of Students

    @Prop({ default: Date.now })
    createdAt: Date;
}

export type StudentReportDocument = StudentReport & Document;
export const StudentReportSchema = SchemaFactory.createForClass(StudentReport);
