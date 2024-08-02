import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class PersonalDetails extends Document {
  @Prop()
  @IsString()
  @Length(1, 100)
  name: string;

  @Prop()
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @Prop()
  @IsString()
  @Length(1, 10)
  gender: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true, unique: true })
  @IsPhoneNumber(null)
  phoneNumber: string;
}

export const PersonalDetailsSchema =
  SchemaFactory.createForClass(PersonalDetails);
