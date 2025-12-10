import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { BullModule } from '@nestjs/bullmq';
import { NotificationQueue } from './notification.queue';
import { NotificationEmailProcessor } from './notification.processor';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: 'simon.rosedale99@gmail.com',
          pass: 'vwnn uoep dtmo kfab',
        },
      },
    }),
    BullModule.registerQueue({
      name: 'appointment-emails',
    }),
  ],
  providers: [
    NotificationService,
    NotificationEmailProcessor,
    NotificationQueue,
  ],
  exports: [NotificationService, NotificationQueue],
})
export class NotificationModule {}
