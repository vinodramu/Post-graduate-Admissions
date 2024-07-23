import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Dashboard {
    @Prop({ required: true })
    program: string;

    @Prop({ required: true })
    totalStudents: number;

    @Prop({ required: true })
    totalApplications: number;

    @Prop({ required: true, enum: ['Open', 'Closed'] })
    admissionStatus: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export type DashboardDocument = Dashboard & Document;
export const DashboardSchema = SchemaFactory.createForClass(Dashboard);
