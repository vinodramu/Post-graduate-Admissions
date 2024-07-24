import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

@Schema()
export class Education extends MongooseDocument {
  @Prop({ required: true })
  level: string; // e.g., '10th', '12th', 'Graduation'

  @Prop({ required: true })
  board: string; // e.g., 'CBSE', 'State Board'

  @Prop({ required: true })
  roll_no: string;

  @Prop({ required: true })
  school_college_name: string;

  @Prop({ required: true })
  year_of_passing: number;

  @Prop({ required: true })
  percentage_cgpa: number;

  @Prop()
  specialization?: string; // Only for graduation
}

export const EducationSchema = SchemaFactory.createForClass(Education);
