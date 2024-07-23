import mongoose, { Schema, Document } from 'mongoose';

export interface Examination extends Document {
    name: string;
    age: number;
    aadharno: string;
    dob: Date;
    email: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    nationality: string;
    caste: string;
    hallticketno: string;
    degreecertificate: string;
    yop: number;
    cgpaPer: string;
    courses: string;
    city1: string;
    city2: string;
    city3: string;
    photo: string;
    signature: string;
    fees: number;
    paymentStatus: string;
}

export const ExaminationSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    aadharno: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    nationality: { type: String, required: true },
    caste: { type: String, required: true },
    hallticketno: { type: String, required: true },
    degreecertificate: { type: String, required: true },
    yop: { type: Number, required: true },
    cgpaPer: { type: String, required: true },
    courses: { type: String, required: true },
    city1: { type: String, required: true },
    city2: { type: String, required: true },
    city3: { type: String, required: true },
    photo: { type: String, required: true },
    signature: { type: String, required: true },
    fees: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
});

export const ExaminationModel = mongoose.model<Examination>('Examination', ExaminationSchema, 'examinations');
