import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Course extends Document {
  @Prop({ required: true, unique: true })
  course_id: string;

  @Prop({ required: true })
  course_name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  fee_structure: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
