import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SuperAdminModule } from './SuperAdmin/superadmin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/adminpanel'),
    SuperAdminModule,
  ],
})
export class AppModule { }
