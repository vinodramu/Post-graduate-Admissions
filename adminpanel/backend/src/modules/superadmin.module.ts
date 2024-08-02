import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminService } from '../services/superadmin.service';
import { SuperAdminController } from '../controllers/superadmin.controller';
import { SuperAdmin, SuperAdminSchema } from '../models/superadmin.entity';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import ExamCentre, { ExamCentreSchema } from 'src/models/exam-center.entity';
// import { AdminService } from 'src/services/admin.service';
import { Admin, AdminSchema } from 'src/models/admin.schema';
import { MailService } from 'src/services/mailing.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SuperAdmin.name, schema: SuperAdminSchema },
            { name: ExamCentre.name, schema: ExamCentreSchema },
            { name: Admin.name, schema: AdminSchema }
        ])
    ],
    controllers: [SuperAdminController],
    providers: [SuperAdminService, AuthService, JwtService, MailService],
})
export class SuperAdminModule { }
