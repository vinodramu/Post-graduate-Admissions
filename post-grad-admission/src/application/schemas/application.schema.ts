import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Application extends Document {
  @Prop({ type: Types.ObjectId, ref: 'PersonalDetails' })
  studentId: Types.ObjectId;

  @Prop()
  status: string;

  @Prop()
  submissionDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'Course'})
  courseId: Types.ObjectId;

  @Prop()
  fee: number;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
//coment
