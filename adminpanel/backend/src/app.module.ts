import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SuperAdminModule } from './modules/superadmin.module';
import { AdminModule } from './modules/admin.module';
import { ExaminationCenterModule } from './modules/examinationcenter.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/studentregistration'),
    SuperAdminModule,
    AdminModule,
    ExaminationCenterModule
  ],
})
export class AppModule { }
