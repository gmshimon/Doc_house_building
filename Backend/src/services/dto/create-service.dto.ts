export class CreateServiceDto {
  name: string;
  duration: number;
  fee: number;
  doctorIds?: number[];
}
