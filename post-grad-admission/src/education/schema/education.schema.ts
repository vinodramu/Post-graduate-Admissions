import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Education extends Document {
  @Prop({ required: true })
  levelOfEducation: string;

  @Prop({ required: true })
  institution: string;

  @Prop({ required: true })
  yearOfPassing: number;

  @Prop({ required: true })
  percentage: string;
}

export const EducationSchema = SchemaFactory.createForClass(Education);

@Schema()
export class EducationalDetails extends Document {
  @Prop({ type: Types.ObjectId, ref: 'PersonalDetails' })
  studentId: Types.ObjectId;

  @Prop({ type: [EducationSchema], required: true })
  education: Education[];
}

export const EducationalDetailsSchema =
  SchemaFactory.createForClass(EducationalDetails);
//coment
