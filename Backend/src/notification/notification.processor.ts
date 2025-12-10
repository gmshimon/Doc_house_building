import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationService } from './notification.service';
import { buildAppointmentEmails, buildAppointmentReminders } from './email-templates';

@Processor('appointment-emails')
export class NotificationEmailProcessor extends WorkerHost {
  constructor(private readonly notificationService: NotificationService) {
    super();
  }

  async process(job: Job<any>) {

    switch (job.name) {
      case 'send-appointment-emails':
        return this.handleSendAppointmentEmails(job);
      case 'send-appointment-reminder':
        return this.handleSendAppointmentReminder(job);
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }

  private async handleSendAppointmentEmails(job: Job<any>) {
    const { patientEmail, doctorEmail } = buildAppointmentEmails(job.data);
    await Promise.all([
      this.notificationService.sendEmail(patientEmail),
      this.notificationService.sendEmail(doctorEmail),
    ]);
  }

  private async handleSendAppointmentReminder(job: Job<any>) {
    const { patientReminder, doctorReminder } = buildAppointmentReminders(job.data);

  await Promise.all([
    this.notificationService.sendEmail(patientReminder),
    this.notificationService.sendEmail(doctorReminder),
  ])
  }
}
