import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class StudentVerification {
    @Prop({ required: true })
    studentId: string;

    @Prop({ required: true, enum: ['Verified', 'Pending', 'Rejected'] })
    verificationStatus: string;

    @Prop()
    remarks?: string;

    @Prop()
    verifiedBy?: string;

    @Prop()
    verifiedAt?: Date;
}

export type StudentVerificationDocument = StudentVerification & Document;
export const StudentVerificationSchema = SchemaFactory.createForClass(StudentVerification);
