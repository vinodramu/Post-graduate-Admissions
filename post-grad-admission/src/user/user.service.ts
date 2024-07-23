import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Twilio } from 'twilio';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { User, UserDocument } from './user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SendOtpDto } from 'src/dto/otp.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto'
import { SentMessageInfo } from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';
import {environment } from '../environment'
dotenv.config();

@Injectable()
export class UserService {
  private twilioClient: Twilio;
  private transporter: nodemailer.Transporter;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
  private readonly mailerService: MailerService
  ){
    this.twilioClient = new Twilio(environment.twiloId,environment.twilosecretKey);
  }

  async sendMail(to: string, subject: string, template: string, context: any): Promise<SentMessageInfo> {
    const mailOptions = {
      from: environment.fromEmail,
      to,
      subject,
      template,
      context,
    };
    return this.mailerService.sendMail(mailOptions);  
}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { username, email, phone, password, confirmpassword } = createUserDto;
  
    if (password !== confirmpassword) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, email, phone, password: hashedPassword, phoneVerified: false, });
    await user.save();
    return { message: 'Registration successful. Please verify your phone number.' };
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
      from: environment.fromphone,
      to: phone,
    });
    return { message: 'OTP sent successfully.' };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<any> {
    const { phone, otp } = verifyOtpDto;
    const user = await this.userModel.findOne({ phone });
    if (!user || user.otp !== otp) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }
    user.phoneVerified = true;
    user.otp = undefined; // Clear the OTP
    await user.save();
    await this.sendMail(
      user.email,
      'Registration Successful',
      'registration-email.hbs',
      { username: user.username }
    );
    return true;
   }

   async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

 
}
