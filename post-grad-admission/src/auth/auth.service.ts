// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  private readonly jwtSecret = 'secret1204'; // Use a strong secret

  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string } | { error: string }> {
    const user = await this.validate(email, password);

    if (!user.phoneVerified) {
      return { error: 'Phone number not verified' };
    }

    const payload = { email: user.email };
    const accessToken = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });

    return { accessToken };
  }
}
