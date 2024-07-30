import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProgramWiseReport {
    @Prop({ required: true })
    programName: string;

    @Prop({ required: true })
    reportDate: Date;

    @Prop({ required: true })
    totalStudents: number;

    @Prop()
    categoryWise?: Record<string, number>;  // Key: Category, Value: Number of Students

    @Prop()
    subjectWise?: Record<string, number>;  // Key: Subject, Value: Number of Students

    @Prop({ default: Date.now })
    createdAt: Date;
}

export type ProgramWiseReportDocument = ProgramWiseReport & Document;
export const ProgramWiseReportSchema = SchemaFactory.createForClass(ProgramWiseReport);
