import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document as MongooseDocument,
  Schema as MongooseSchema,
} from 'mongoose';

@Schema()
export class Payment extends MongooseDocument {
  @Prop({ required: true, unique: true })
  OrderId: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'PersonalDetails',
    required: true,
  })
  studentId: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Application',
    required: true,
  })
  applicationId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  receiptId: string;

  @Prop({ required: true })
  paymentDate: Date;

  @Prop({ required: true })
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
