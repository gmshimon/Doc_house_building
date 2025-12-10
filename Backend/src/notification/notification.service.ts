import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
interface EmailOptions {
  to: string;
  subject?: string;
  html: string;
}
@Injectable()
export class NotificationService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({ to, subject = 'Test Subject', html }: EmailOptions) {
    await this.mailerService.sendMail({
      from: 'simon.rosedale99@gmail.com',
      to,
      subject,
      html,
      text: html,
    });
  }
}
