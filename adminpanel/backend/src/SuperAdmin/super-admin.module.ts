import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperAdminService } from './super-admin.service';
import { SuperAdminController } from './super-admin.controller';
import { SuperAdmin, SuperAdminSchema } from './super-admin.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: SuperAdmin.name, schema: SuperAdminSchema }]),
    ],
    controllers: [SuperAdminController],
    providers: [SuperAdminService],
})
export class SuperAdminModule { }
