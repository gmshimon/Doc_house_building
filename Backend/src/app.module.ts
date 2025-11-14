import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { DocterModule } from './docter/docter.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, UserModule, DocterModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
