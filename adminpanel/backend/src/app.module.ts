import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SuperAdminModule } from './modules/superadmin.module';
// import { AdminModule } from './modules/admin.module';
import { ExaminationCenterModule } from './modules/examinationcenter.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './modules/course.module';
import { MailerModule } from '@nestjs-modules/mailer'
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

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
    // AdminModule,
    ExaminationCenterModule,
    CourseModule
  ],
})
export class AppModule { }
