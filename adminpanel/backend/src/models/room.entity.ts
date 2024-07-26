import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Room extends Document {
    @Prop({ required: true, unique: true })
    roomId: string;

    @Prop({ type: Types.ObjectId, ref: 'ExamCenter', unique: true })
    centerId: Types.ObjectId;

    @Prop({ required: true })
    roomNumber: string;

    @Prop({ required: true })
    capacity: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
//coment