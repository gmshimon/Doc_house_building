/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { User } from '@prisma/client';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createAppointment(
    @Req() request: Request,
    @Res() response: Response,
    @Body() dto: CreateAppointmentDto,
  ) {
    try {
      const user = (request as Request & { user?: User }).user;

      if (!user) {
        response.status(401).json({
          status: 'failed',
          message: 'User not authenticated',
        });
        return;
      }

      const result = await this.appointmentService.createAppointment(
        +user.id,
        dto,
      );
      response.status(201).json({
        status: 'success',
        message: 'Appointment created successfully',
        data: result,
      });
    } catch (error) {
      response.status(400).json({
        status: 'failed',
        message: error,
      });
    }
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  async getUserAppointments(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    try {
      const user = (request as Request & { user?: User }).user;

      if (!user) {
        response.status(401).json({
          status: 'failed',
          message: 'User not authenticated',
        });
        return;
      }

      const result = await this.appointmentService.getUserAppointments(
        +user.id,
      );
      response.status(200).json({
        status: 'success',
        message: 'User appointments fetched successfully',
        data: result,
      });
    } catch (error) {
      response.status(400).json({
        status: 'failed',
        message: error,
      });
    }
  }
}
