import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Course extends Document {
  @Prop({ required: true, unique: true })
  courseId: string;

  @Prop({ required: true })
  courseName: string;

  @Prop({ required: true })
  fee: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);