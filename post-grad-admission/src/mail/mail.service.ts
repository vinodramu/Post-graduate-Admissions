import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as hbs from 'nodemailer-express-handlebars';
import * as path from 'path';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'mail.electems.com',
      port: 465,
      ssl: false,
      tls: true,
      auth: {
        user: "correspondence@rms.electems.com",
        pass: 'cybis@ban',
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve('./src/mail/templetes/'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./src/mail/templetes/'),
      extName: '.hbs',
    };

    this.transporter.use('compile', hbs(handlebarOptions));
  }

  async sendMail(): Promise<SentMessageInfo> {
    const mailOptions = {
      from: "correspondence@rms.electems.com",
      to:"shiva@electems.com",
      subject:"hello",
      template:"registration-email.hbs",
    };

    await this.transporter.sendMail(mailOptions);
  }
}
