import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Student {
    @Prop({ required: true })
    studentId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Program' })
    programId: string;

    @Prop()
    gpa: number;

    @Prop()
    enrollmentDate: Date;
}

export type StudentDocument = Student & Document;
export const StudentSchema = SchemaFactory.createForClass(Student);
