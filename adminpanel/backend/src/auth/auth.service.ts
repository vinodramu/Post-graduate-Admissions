import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SuperAdmin, SuperAdminDocument } from '../SuperAdmin/superadmin.entity';
import { LoginSuperAdminDto } from 'src/dto/login-super-admin.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(SuperAdmin.name) private readonly superAdminModel: Model<SuperAdminDocument>,
        @Inject(forwardRef(() => JwtService))
        private readonly jwtService: JwtService,
    ) {
        const jwtSecret = `secret1204`;
        Logger.log(`JWT Secret: ${jwtSecret}`, 'AuthService');
    }

    async validateUserIsAuthorized(credentials: LoginSuperAdminDto): Promise<{ userId: string; username: string } | null> {
        const getUser = await this.superAdminModel.findOne({ adminId: credentials.adminId }).exec();

        if (getUser && await bcrypt.compare(credentials.password, getUser.password)) {
            return { userId: getUser._id.toString(), username: getUser.username };
        }
        return null;
    }

    async login(user: { username: string; userId: string }) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload, { secret: `${process.env.JWT_SECRET}` })
        };
    }
}
