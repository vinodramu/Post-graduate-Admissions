// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { LoginDto } from './dto/login.dto';
// import { OtpDto } from './dto/otp.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('register')
//   async register(@Body() createUserDto: CreateUserDto) {
//     return this.authService.register(createUserDto);
//   }

//   @Post('login')
//   async login(@Body() loginDto: LoginDto) {
//     return this.authService.login(loginDto);
//   }

//   @Post('verify-otp')
//   async verifyOtp(@Body() otpDto: OtpDto) {
//     return this.authService.verifyOtp(otpDto);
//   }
// }
