import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminService } from './superadmin.service';
import { SuperAdminController } from './superadmin.controller';
import { SuperAdmin, SuperAdminSchema } from './superadmin.entity';
import { Student, StudentSchema } from './student.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: SuperAdmin.name, schema: SuperAdminSchema },
            { name: Student.name, schema: StudentSchema }
        ])
    ],
    controllers: [SuperAdminController],
    providers: [SuperAdminService, AuthService, JwtService],
})
export class SuperAdminModule { }
