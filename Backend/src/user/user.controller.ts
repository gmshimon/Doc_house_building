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
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createUserDto: Prisma.UserCreateInput,
  ) {
    try {
      const result = await this.userService.create(createUserDto);
      response.status(200).json({
        status: 'Success',
        message: 'Successful',
        data: result,
      });
    } catch (error) {
      console.log(error);
      response.status(400).json({
        status: 'Failed',
        message: error,
      });
    }
  }

  @Post('get-user')
  async fetchUser(
    @Req() request: Request,
    @Res() response: Response,
    @Body() data,
  ) {
    try {
      const user = await this.userService.fetchUser(data);
      response.status(200).json({
        status: 'Success',
        message: 'User fetched successfully',
        data: user,
      });
    } catch (error) {
      response.status(400).json({
        status: 'Failed',
        message: error,
      });
    }
  }
}
