// user.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('password') password: string,
    @Body('confirmPassword') confirmPassword: string,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.register(name, email, phone, password, confirmPassword);
      return user;
    } catch (error) {
      return res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  }
}
