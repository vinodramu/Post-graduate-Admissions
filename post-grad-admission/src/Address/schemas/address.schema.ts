import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema()
export class Address extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Student' })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'PersonalDetails' })
  personalDetailsId: Types.ObjectId;

  @Prop()
  correspondenseAddress: string;

  @Prop()
  permanentAddress: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  pincode: string;

  @Prop()
  country: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
