import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Student extends Document {
  @Prop({ type: Types.ObjectId })
  personalDetailsId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  addressId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  educationDetailsId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  documentId: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Application' })
  applicationIds: Types.ObjectId[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
//coment
