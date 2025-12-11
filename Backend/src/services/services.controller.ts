/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { User } from '@prisma/client';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createServiceDto: CreateServiceDto,
  ) {
    try {
      const user = (request as Request & { user?: User }).user;

      if (user?.role !== 'ADMIN') {
        return response.status(403).json({
          status: 'failed',
          message: 'Forbidden: You do not have permission to create a service',
        });
      }

      const result = await this.servicesService.create(createServiceDto);
      response.status(201).json({
        status: 'success',
        message: 'Service created successfully',
        data: result,
      });
    } catch (error) {
      response.status(400).json({
        status: 'failed',
        message: error,
      });
    }
  }

  @Get()
  async findAll(
    @Req() request: Request,
    @Res() response: Response,
    @Query('name') name: string,
  ) {
    try {
      const results = await this.servicesService.findAll(name);
      response.status(200).json({
        status: 'success',
        message: 'Services fetched successfully',
        data: results,
      });
    } catch (error) {
      response.status(400).json({
        status: 'failed',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        message: error.message,
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    try {
      const user = (request as Request & { user?: User }).user;

      if (user?.role !== 'ADMIN') {
        return response.status(403).json({
          status: 'failed',
          message: 'Forbidden: You do not have permission to create a service',
        });
      }

      const result = this.servicesService.update(+id, updateServiceDto);
      response.status(200).json({
        status: 'success',
        message: 'Service updated successfully',
        data: result,
      });
    } catch (error) {
      response.status(400).json({
        status: 'failed',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        message: error.message,
      });
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
