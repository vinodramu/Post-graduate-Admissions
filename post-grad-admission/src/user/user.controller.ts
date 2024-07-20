// user.controller.ts
import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { SendOtpDto } from 'src/dto/otp.dto';
import { VerifyOtpDto } from 'src/dto/verify-otp.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('/sendotp/:phoneNumber')
  async sendOtp(@Param('phoneNumber') phone: string): Promise<any> {
    const sendOtpDto: SendOtpDto = { phone };
    return this.userService.sendOtp(sendOtpDto);
  }

  @Post('/verifyotp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<any> {
    return this.userService.verifyOtp(verifyOtpDto);
  }
}
