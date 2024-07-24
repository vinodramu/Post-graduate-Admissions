import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Education, EducationSchema } from 'src/education/schemas/education.schema';

@Schema()
export class Student extends Document {
  @Prop({ required: true, unique: true })
  student_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date_of_birth: Date;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [String], required: true })
  state: string[];

  @Prop({ required: true })
  pincode: string;

  @Prop({ type: [String], required: true })
  country: string[];

  @Prop({ type: [EducationSchema], required: true })
  educational_details: Education[];

}

export const StudentSchema = SchemaFactory.createForClass(Student);
