// src/examination/examination.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Examination } from './examination.interface';
import { CreateExaminationDto } from '../dto/create-examination.dto';
import axios from 'axios';
import {environment} from '../environment'
import path from 'path';

@Injectable()
export class ExaminationService {
  private readonly razorpayKeyId = environment.razorpayKeyId;
  private readonly razorpayKeySecret = environment.razorpayKeySecret;

  constructor(@InjectModel('Examination') private readonly examinationModel: Model<Examination>) {}

  async createExamination(createExaminationDto: CreateExaminationDto) {
    const examination = new this.examinationModel(createExaminationDto);
    await examination.save();
    return examination;
  }

  async createOrder(amount: number) {
    try {
      const response = await axios.post('https://api.razorpay.com/v1/orders', {
        amount: amount * 100, // amount in the smallest currency unit (e.g., paise for INR)
        currency: 'INR',
        receipt: 'receipt_order_74394',
      }, {
        auth: {
          username: this.razorpayKeyId,
          password: this.razorpayKeySecret,
        },
      });
      return response.data;
    } catch (error) {
      throw new BadRequestException('Could not create order');
    }
  }

  async updatePhoto(id: string, filename: string): Promise<Examination> {
    const photofilePath = path.join('uploads', filename);
    const result = await this.examinationModel.findByIdAndUpdate(
      id,
      { photo: photofilePath },
      { new: true },
    );

    if (!result) {
      throw new BadRequestException('Examination not found');
    }

    return result;
  }
}
