import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class College extends Document {
    @Prop({ required: true, unique: true })
    collegeId: string;

    @Prop({ required: true })
    collegeName: string;

    @Prop({ type: Types.ObjectId, ref: 'Address', unique: true })
    addressId: Types.ObjectId;
}

export const CollegeSchema = SchemaFactory.createForClass(College);
