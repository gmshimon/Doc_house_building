export class CreateAppointmentDto {
  doctorId: number;
  serviceId: number;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
}
