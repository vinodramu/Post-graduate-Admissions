// user.service.ts
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { User, UserDocument } from './user.entity';
import { Twilio } from 'twilio';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { SendOtpDto } from 'src/dto/otp.dto';

@Injectable()
export class UserService {
  private twilioClient: Twilio;
  private transporter: nodemailer.Transporter
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  async register(
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string
  ): Promise<User> {
    try {
      Logger.log(`Creating user with name: ${name}, email: ${email}, phone: ${phone}`);
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({
        name,
        email,
        phone,
        password: hashedPassword,
        confirmPassword: hashedPassword
      });
      Logger.log(`User created successfully: ${user.name}`);
      const savedUser = await this.userRepository.save(user);
      Logger.log(`Creating user with name: ${savedUser.name}, email: ${email}, phone: ${phone}`);
      return savedUser;
    } catch (error) {
      Logger.log(error)
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  async sendOtp(sendOtpDto: SendOtpDto): Promise<any> {
    const { phone } = sendOtpDto;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await this.userModel.findOne({ phone });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.otp = otp;
    await user.save();
    await this.twilioClient.messages.create({
      body: `Your OTP is ${otp}`,
      from: '+1234567890', // Your Twilio phone number
      to: phone
    });
    return { message: 'OTP sent successfully.' };
  }

  
}
