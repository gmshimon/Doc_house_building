import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { Request, Response } from 'express';
import { Prisma, User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { multerOptions } from 'src/upload/multer-options';
import { FileInterceptor } from '@nestjs/platform-express';

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message: error,
      });
    }
  }

  @Put('update')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(
    @Req() request: Request,
    @Res() response: Response,
    @Body() data,
  ) {
    try {
      const user = (request as Request & { user?: User }).user;

      const result = await this.userService.updateProfile(user, data);

      response.status(200).json({
        status: 'Success',
        message: 'User updated Successfully',
        data: result,
      });
    } catch (error) {
      response.status(400).json({
        status: 'Failed',
        message: error,
      });
    }
  }

  @Put('update-image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async updateUserImage(
    @Req() request: Request,
    @Res() response: Response,
    @UploadedFile() file,
  ) {
    try {
      const user = (request as Request & { user?: User }).user;
      const result = await this.userService.updateUserImage(user, file);
      response.status(200).json({
        status: 'Success',
        message: 'Image uploaded successfully',
        data: result,
      });
    } catch (error) {
      response.status(400).json({
        status: 'Failed',
        message: error,
      });
    }
  }
}
