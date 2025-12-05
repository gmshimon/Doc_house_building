import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { Prisma, User } from '@prisma/client';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async create(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createServiceDto: Prisma.ServiceCreateInput,
  ) {
    try {
      // const user = (request as Request & { user?: User }).user;

      // if (user?.role !== 'ADMIN') {
      //   return response.status(403).json({
      //     status: 'failed',
      //     message: 'Forbidden: You do not have permission to create a service',
      //   });
      // }

      const result = await this.servicesService.create(createServiceDto);
      response.status(201).json({
        status: 'success',
        message: 'Service created successfully',
        data: result,
      });
    } catch (error) {
      response.status(400).json({
        status: 'failed',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message: error,
      });
    }
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: Prisma.ServiceUpdateInput,
  ) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
