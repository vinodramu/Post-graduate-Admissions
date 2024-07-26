import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Application extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Student' })
  studentId: Types.ObjectId;

  @Prop()
  status: string;

  @Prop()
  submissionDate: Date;

  @Prop({ type: Types.ObjectId })
  collegeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  courseId: Types.ObjectId;

  @Prop()
  examCenterAllotment: string;

  @Prop()
  roomAllotment: string;

  @Prop()
  fee: number;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
//coment
