export class UpdateServiceDto {
  name?: string;
  duration?: number;
  fee?: number;
  // New field: the final, desired list of Doctor IDs
  doctorIds?: number[];
}
