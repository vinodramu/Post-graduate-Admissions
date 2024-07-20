import { Module, Logger } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminSchema } from '../SuperAdmin/superadmin.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { SuperAdminModule } from '../SuperAdmin/superadmin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(), // Make sure ConfigModule is imported and configured
        SuperAdminModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const secret = configService.get<string>('JWT_SECRET');
                Logger.log(`JWT Secret in Module: ${secret}`, 'AuthModule'); // Log the secret
                return {
                    secret,
                    signOptions: { expiresIn: '60m' },
                };
            },
        }),
        MongooseModule.forFeature([{ name: 'SuperAdmin', schema: SuperAdminSchema }]),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }
