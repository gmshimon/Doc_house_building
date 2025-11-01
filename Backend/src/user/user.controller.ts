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
      response.status(200).json({
        status: 'Failed',
        message: 'Internal Server Error',
      });
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
