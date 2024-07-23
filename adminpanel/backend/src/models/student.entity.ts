import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    age: number;

    @Prop({ required: true, unique: true })
    aadharno: string;

    @Prop({ required: true })
    dob: Date;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    district: string;

    @Prop({ required: true })
    nationality: string;

    @Prop({ required: true })
    caste: string;

    @Prop({ required: true, unique: true })
    hallticketno: string;

    @Prop({ required: true, unique: true })
    degreecertificate: string;

    @Prop({ required: true })
    yop: number;

    @Prop({ required: true })
    cgpaPer: string;

    @Prop({ required: true })
    courses: string;

    @Prop({ required: true })
    city1: string;

    @Prop({ required: true })
    city2: string;

    @Prop({ required: true })
    city3: string;

    @Prop({ required: true })
    photo: string;

    @Prop({ required: true })
    signature: string;

    @Prop({ required: true })
    fees: number;

    @Prop({ required: true, enum: ['Pending', 'Paid'], default: 'Pending' })
    paymentStatus: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
