import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/create-order')
  async create(@Body() createOrderDto:any) {
    return this.paymentService.createOrder(createOrderDto);
  }

  @Post('/verify')
  async verifyPayment(@Body() verifyPaymentDto: { paymentId: string; orderId: string }): Promise<any> {
    const { paymentId, orderId } = verifyPaymentDto;

    // Logic to verify payment and update status
    return this.paymentService.verifyPayment(paymentId, orderId);
  }

  @Get('order/:studentId')
  async getPaymentStatusBystudentId(@Param('studentId') studentId: string): Promise<{ status: string }> {
    const result = await this.paymentService.getPaymentStatusBystudentId(studentId);
    if (!result) {
      throw new NotFoundException(`Payment with studentId ${studentId} not found`);
    }
    return result;
  }

}
