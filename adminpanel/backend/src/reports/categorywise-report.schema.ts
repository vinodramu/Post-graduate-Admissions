import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CategoryWiseReport {
    @Prop({ required: true })
    categoryName: string;

    @Prop({ required: true })
    reportDate: Date;

    @Prop({ required: true })
    totalStudents: number;

    @Prop()
    programWise?: Record<string, number>;  // Key: Program Name, Value: Number of Students

    @Prop()
    subjectWise?: Record<string, number>;  // Key: Subject, Value: Number of Students

    @Prop({ default: Date.now })
    createdAt: Date;
}

export type CategoryWiseReportDocument = CategoryWiseReport & Document;
export const CategoryWiseReportSchema = SchemaFactory.createForClass(CategoryWiseReport);
