import { PartialType } from '@nestjs/mapped-types';
import { CreateDocterDto } from './create-docter.dto';

export class UpdateDocterDto extends PartialType(CreateDocterDto) {}
