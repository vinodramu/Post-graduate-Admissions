import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document as MongooseDocument,
  Schema as MongooseSchema,
} from 'mongoose';

@Schema()
export class Payment extends MongooseDocument {
  @Prop({  })
  orderId: string;

  @Prop({
    ref: 'PersonalDetails',
    required: true,
  })
  studentId:string;

  @Prop({ required: false })
  paymentId?: string; 

  @Prop({  })
  amount: number;

  @Prop({ })
  receiptId: string;

  @Prop({  })
  paymentDate: Date;

  @Prop({ })
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
