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
import { MailerService } from 'src/mail/mail.service';

dotenv.config();

@Injectable()
export class UserService {
  private twilioClient: Twilio;
  private transporter: nodemailer.Transporter;
  private readonly mailerService: MailerService

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.twilioClient = new Twilio("");
    // this.transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.GMAIL_USER,
    //     pass: process.env.GMAIL_PASS,
    //   },
    // });
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
      from: "+13203137936",
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
   await this.mailerService.sendMail(
      // user.email,
      // 'Registration Successful',
      // 'registration-email.hbs', // Adjust template name if needed
      // { username: user.username }
    );
    return { message: 'Phone number verified successfully.'};
   }

  // async sendEmail(emailDto: EmailDto): Promise<any> {
  //   const { email, subject, body } = emailDto;
  //   const mailOptions = {
  //     from: process.env.GMAIL_USER,
  //     to: email,
  //     subject: subject,
  //     text: body,
  //   };
  //   await this.transporter.sendMail(mailOptions);
  //   return { message: 'Email sent successfully.' };
  // }
}
