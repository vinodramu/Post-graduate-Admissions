import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminService } from '../services/superadmin.service';
import { SuperAdminController } from '../controllers/superadmin.controller';
import { SuperAdmin, SuperAdminSchema } from '../models/superadmin.entity';
import { Student, StudentSchema } from '../models/student.entity';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import {  ExaminationSchema } from 'src/models/examinations';
import { AdminService } from 'src/services/admin.service';
import { Admin, AdminSchema } from 'src/models/admin.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SuperAdmin.name, schema: SuperAdminSchema },
            { name: Student.name, schema: StudentSchema },
            { name: 'Examination', schema: ExaminationSchema },
            { name: Admin.name, schema: AdminSchema }
        ])
    ],
    controllers: [SuperAdminController],
    providers: [SuperAdminService, AuthService, JwtService, AdminService],
})
export class SuperAdminModule { }
