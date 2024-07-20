import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SuperAdmin, SuperAdminDocument } from '../SuperAdmin/superadmin.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(SuperAdmin.name) private superAdminModel: Model<SuperAdminDocument>,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        Logger.log(`JWT Secret in AuthService: ${jwtSecret}`, 'AuthService');
    }

    async validateUser(username: string, pass: string): Promise<{ username: string; _id: string } | null> {
        const user = await this.superAdminModel.findOne({ username }).exec();
        Logger.log(user);
        if (user && await bcrypt.compare(pass, user.password)) {
            return { username: user.username, _id: user._id.toString() };
        }
        return null;
    }

    async login(user: { username: string; _id: string }) {
        const payload = { username: user.username, sub: user._id };
        Logger.log(`Generated access token for user: ${user.username}`, 'AuthService');
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
