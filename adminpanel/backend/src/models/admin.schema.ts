import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Admin extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'PersonalDetails', unique: true })
  personalDetailsId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Address', unique: true })
  addrressDetailsId?: Types.ObjectId;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
//coment
