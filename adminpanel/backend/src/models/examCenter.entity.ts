import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ExamCenter extends Document {
    @Prop({ required: true, unique: true })
    centerId: string;

    @Prop({ required: true })
    centerName: string;

    @Prop({ required: true })
    address: string;
}

export const ExamCenterSchema = SchemaFactory.createForClass(ExamCenter);
//coment