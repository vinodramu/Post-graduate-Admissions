import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendEmail(mailContent: Mailcontent): Promise<void> {
        await this.mailerService.sendMail({
            to: mailContent.email,
            subject: mailContent.subject,
            template: mailContent.template,
            context: mailContent.context
        });
    }
}

interface Mailcontent {
    email : string,
    subject: string,
    template: string //template path
    context: {
        name : string,
    }
}