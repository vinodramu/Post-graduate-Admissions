import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminService } from './superadmin.service';
import { SuperAdminController } from './superadmin.controller';
import { SuperAdmin, SuperAdminSchema } from '../models/superadmin.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { Admin, AdminSchema } from 'src/models/admin.schema';
import { MailService } from 'src/email-service/mailing.service';
import { ExamCenter, ExamCenterSchema } from '../models/examCenter.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SuperAdmin.name, schema: SuperAdminSchema },
            { name: ExamCenter.name, schema: ExamCenterSchema },
            { name: Admin.name, schema: AdminSchema }
        ])
    ],
    controllers: [SuperAdminController],
    providers: [SuperAdminService, AuthService, JwtService, MailService, AdminService],
})
export class SuperAdminModule { }
