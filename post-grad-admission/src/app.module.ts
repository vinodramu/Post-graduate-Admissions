import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './auth/auth.module';
import { environment } from './environment';
import { DocumentModule } from './document/document.module';
import { PersonalDetailsModule } from './personalDetails/personalDetails.module';
import { AddressModule } from './Address/address.module';
import { EducationalDetailsModule } from './education/education.module';
import { ApplicationModule } from './application/application.module';
import { AdminModule } from './Admin/admin.module';
import { CourseModule } from './courses/course.module';
import { PaymentModule } from './payment/payment.module';
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
          user: 'correspondence@rms.electems.com',
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
    MongooseModule.forRoot(environment.mongoDbUri, {}),
    UserModule,
    MailerModule,
    AuthModule,
    PersonalDetailsModule,
    DocumentModule,
    AddressModule,
    EducationalDetailsModule,
    ApplicationModule,
    AdminModule,
    CourseModule,
    PaymentModule
  ],
})
export class AppModule {}
