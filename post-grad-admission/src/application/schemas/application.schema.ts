import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate } from 'class-validator';
import { Document, Types } from 'mongoose';

@Schema()
export class Application extends Document {
  @Prop({ type: Types.ObjectId, ref: 'PersonalDetails', required: true })
  studentId: Types.ObjectId;

  @Prop({ enum: ['Pending', 'Approved', 'Rejected'] })
  status?: string;

  @Prop()
  @IsDate()
  submissionDate?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  fee: number;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
