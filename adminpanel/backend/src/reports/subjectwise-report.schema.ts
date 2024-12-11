import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SubjectWiseReport {
    @Prop({ required: true })
    subjectName: string;

    @Prop({ required: true })
    reportDate: Date;

    @Prop({ required: true })
    totalStudents: number;

    @Prop({ required: true })
    programWise?: Record<string, number>;  // Key: Program Name, Value: Number of Students

    @Prop()
    categoryWise?: Record<string, number>;  // Key: Category, Value: Number of Students

    @Prop({ default: Date.now })
    createdAt: Date;
}

export type SubjectWiseReportDocument = SubjectWiseReport & Document;
export const SubjectWiseReportSchema = SchemaFactory.createForClass(SubjectWiseReport);
