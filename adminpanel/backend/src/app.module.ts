import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExaminationCenterModule } from './examination-center/examinationcenter.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { MailerModule } from '@nestjs-modules/mailer'
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CollegeModule } from './college/college.module';
import { SuperAdminModule } from './super-admin/superadmin.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/studentregistration'),
    MailerModule.forRoot({
      transport: {
        host: 'mail.electems.com',
        port: 465,
        secure: true,
        auth: {
          user: 'correspondence@rms.electems.com',
          pass: 'cybis@ban'
        }
      },
      defaults: {
        from: '"No Reply" <shiva@electems.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        }
      }
    }),
    SuperAdminModule,
    CollegeModule,
    AdminModule,
    ExaminationCenterModule,
    CourseModule
  ],
})
export class AppModule { }
