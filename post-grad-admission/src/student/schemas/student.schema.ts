import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Schema as mongooseSchema, Types } from 'mongoose';
import { Education, EducationSchema } from '../../education/schema/education.schema';
import { v4 as uuidv4 } from 'uuid';
import { Application } from 'src/application/schemas/application.schema';

@Schema()
export class Student extends Document {
  // @Prop({ unique: true , default: () => uuidv4()})
  // student_id: string;

  @Prop({ type: [{ type: [mongooseSchema.Types.ObjectId], ref: 'Application' }] })
  applicationsIds: Types.ObjectId[];

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

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  pincode: string;

  @Prop({ required: true })
  country: string;

  @Prop({ type: [EducationSchema], required: true })
  educational_details: Education[];

}

  export const StudentSchema = SchemaFactory.createForClass(Student);
