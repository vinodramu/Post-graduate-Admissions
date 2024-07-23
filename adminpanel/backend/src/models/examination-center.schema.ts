import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ExaminationCenter {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    location: string;

    @Prop()
    capacity: number;

    @Prop()
    contactNumber: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export type ExaminationCenterDocument = ExaminationCenter & Document;
export const ExaminationCenterSchema = SchemaFactory.createForClass(ExaminationCenter);
