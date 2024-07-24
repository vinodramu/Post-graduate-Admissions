import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './auth/auth.module';
import { ExaminationModule } from './examination/examination.module';
import {environment } from './environment'
import { StudentModule } from './student/student.module';
import { ApplicationModule } from './application/application.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'mail.electems.com',
        port: 465,
        ssl: false,
        tls: true,
        auth: {
          user: "correspondence@rms.electems.com",
          pass: 'cybis@ban',
        },
      },
      defaults: {
        from: '"No Reply" <correspondence@rms.electems.com>',
      },
      template: {
        dir: process.cwd() + '/src/templetes/', // Ensure this path is correct
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MongooseModule.forRoot(environment.mongoDbUri, {
    }),
    UserModule,
    MailerModule,
    AuthModule,
    ExaminationModule,
    StudentModule,
    ApplicationModule
  ],
})
export class AppModule {}
