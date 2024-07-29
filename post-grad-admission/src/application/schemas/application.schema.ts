import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Application extends Document {
  @Prop({ type: Types.ObjectId, ref: 'PersonalDetails', required: true })
  studentId: Types.ObjectId;

  @Prop({ required: true, enum: ['Pending', 'Approved', 'Rejected'] })
  status: string;

  @Prop({ required: true })
  submissionDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  fee: number;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

ApplicationSchema.path('fee').validate(function (value: number) {
  return value >= 0;
}, 'Fee must be a non-negative number');
