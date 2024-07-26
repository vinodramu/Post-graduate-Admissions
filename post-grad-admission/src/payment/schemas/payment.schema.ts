import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document as MongooseDocument,
  Schema as MongooseSchema,
} from 'mongoose';

@Schema()
export class Payment extends MongooseDocument {
  @Prop({ required: true, unique: true })
  payment_id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Student', required: true })
  student_id: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Application',
    required: true,
  })
  application_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  payment_mode: string;

  @Prop({ required: true })
  transaction_id: string;

  @Prop({ required: true })
  payment_date: Date;

  @Prop({ required: true })
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
