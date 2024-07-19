import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, token: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to our app! Confirm your Email',
      template: './registration-email', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        token,
      },
    });
  }
}
