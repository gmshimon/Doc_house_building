import { Module } from '@nestjs/common';
import { NotificationModule } from 'src/notification/notification.module';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';

@Module({
  imports: [NotificationModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
