import { Module } from '@nestjs/common';
import { DocterService } from './docter.service';
import { DocterController } from './docter.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [DocterController],
  providers: [DocterService],
})
export class DocterModule {}
