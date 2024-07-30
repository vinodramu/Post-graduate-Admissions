import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from '../models/admin.schema';
import { AdminService } from '../services/admin.service';
import { AdminController } from '../controllers/admin.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
    providers: [AdminService],
    controllers: [AdminController],
    exports: [AdminService],
})
export class AdminModule { }
