import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationQueue {
  constructor(@InjectQueue('appointment-emails') private queue: Queue) {}

  async enqueueAppointmentEmails(payload: any) {
    // payload should contain everything needed to render emails
    return this.queue.add('send-appointment-emails', payload, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
      removeOnComplete: true,
      removeOnFail: false,
    });
  }

  async enqueueReminderEmails(payload: any, reminderDate: string) {
    const delayMs = Math.max(new Date(reminderDate).getTime() - Date.now(), 0);
    return this.queue.add('send-appointment-reminder', payload, {
      delay: delayMs,
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}
