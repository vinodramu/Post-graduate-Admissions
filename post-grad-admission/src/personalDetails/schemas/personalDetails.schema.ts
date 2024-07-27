import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PersonalDetails extends Document {
  @Prop()
  name: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  gender: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;
}

export const PersonalDetailsSchema =
  SchemaFactory.createForClass(PersonalDetails);
//coment
