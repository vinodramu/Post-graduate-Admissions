import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import  Razorpay from 'razorpay';
import { Payment } from './schemas/payment.schema';

@Injectable()
export class PaymentService {
  private razorpay: Razorpay;

  constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment>) {
    this.razorpay = new Razorpay({
      key_id: 'rzp_test_kqg5JL2yQ6uiVn',
      key_secret: 'FhQ6zBw8LFmzdkileVWGHtd6',
    });
  }

 

  async createOrder(createOrderDto:any): Promise<any> {
    const { amount, studentId } = createOrderDto;

    const options = {
      amount: amount *100, // Convert to smallest currency unit
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    try {
      const order = await this.razorpay.orders.create(options);
      let actualAmount: number = (order.amount as number) / 100;
      const newPayment = new this.paymentModel({
        orderId: order.id,
        amount: actualAmount,
        receiptId: order.receipt,
        currency: order.currency,
        studentId,
        paymentId:null,
        paymentDate:Date.now(),
        status: 'pending', // or any initial status
      });

      await newPayment.save();

      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async verifyPayment(paymentId: string,orderId: string,): Promise<any> {
    try {
      const updatedPayment = await this.paymentModel.findOneAndUpdate(
        { orderId: orderId },
        {
          paymentId: paymentId,
          status:'paid', // Update with the actual status from Razorpay
        },
        { new: true }
      );
  
      return updatedPayment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPaymentStatusBystudentId(studentId: string): Promise<{ status: string } | null> {
    const payment = await this.paymentModel.findOne({ studentId }).exec();
    if (payment) {
      return { status: payment.status };
    }
    return null;
  }
}
