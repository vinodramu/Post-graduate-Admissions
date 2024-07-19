// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../user/user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { LoginDto } from './dto/login.dto';
// import { OtpDto } from './dto/otp.dto';

// @Injectable()
// export class AuthService {
//   constructor(
//     private userService: UserService,
//     private jwtService: JwtService
//   ) {}

//   async register(createUserDto: CreateUserDto) {
//     const user = await this.userService.create(createUserDto);
//     // Send email and SMS with OTP
//     // Return user or token
//   }

//   async login(loginDto: LoginDto) {
//     const user = await this.userService.findByCredentials(loginDto);
//     const payload = { username: user.username, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }

//   async verifyOtp(otpDto: OtpDto) {
//     // Verify OTP logic
//   }
// }
