import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DocterService } from './docter.service';
import { UpdateDocterDto } from './dto/update-docter.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/upload/multer-options';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Prisma } from '@prisma/client';
import { type Request, type Response } from 'express';

@Controller('docter')
export class DocterController {
  constructor(
    private readonly docterService: DocterService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  @Post()
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(
    @Req() request: Request,
    @Res() response: Response,
    @UploadedFile() file,
    @Body() createDocterDto: Prisma.DoctorCreateInput,
  ) {
    let imageUrl: string | undefined;
    try {
      if (file) {
        imageUrl = await this.cloudinaryService.uploadImage(file);
        createDocterDto.image = imageUrl;
      }
      const result = await this.docterService.create(createDocterDto);
      response.status(200).json({
        status: 'success',
        message: 'Doctor created successfully',
        data: result,
      });
    } catch (error) {
      if (imageUrl) {
        await this.cloudinaryService.deleteImage(imageUrl);
      }
      console.error('Error uploading image or creating doctor:', error);
      response.status(400).json({
        status: 'failed',
        message: 'Error creating doctor',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: error.message,
      });
    }
  }

  @Post('/update-image/:id')
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async updateImage(
    @Req() request: Request,
    @Res() response: Response,
    @UploadedFile() file,
    @Param('id') id: string,
  ) {
    let imageUrl: string | undefined;
    try {
      let data = {
        image: '',
      };

      if (file) {
        imageUrl = await this.cloudinaryService.uploadImage(file);
        data.image = imageUrl;
      }
      const result = await this.docterService.updateImage(+id, data);
      response.status(200).json({
        status: 'success',
        message: 'Doctor image updated successfully',
        data: result,
      });
    } catch (error) {
      response.status(400).json({
        status: 'failed',
        message: 'Error updating doctor image',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: error.message,
      });
      if (imageUrl) {
        await this.cloudinaryService.deleteImage(imageUrl);
      }
    }
  }

  @Get()
  async findAll(@Req() request: Request, @Res() response: Response) {
    try {
      const result = await this.docterService.findAll();
      response.status(200).json({
        status: 'success',
        message: 'Doctors fetched successfully',
        data: result,
      });
    } catch (error) {
      response.status(400).json({
        status: 'failed',
        message: 'Error fetching doctors',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: error.message,
      });
    }
  }

  @Get(':id')
  async findOne(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    try {
      const doctor = await this.docterService.findOne(+id);

      response.status(200).json({
        status: 'success',
        message: 'Doctor fetched successfully',
        data: doctor,
      });
    } catch (error) {
      response.status(400).json({
        status: 'failed',
        message: 'Error fetching doctor',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: error.message,
      });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocterDto: UpdateDocterDto) {
    return this.docterService.update(+id, updateDocterDto);
  }

  @Delete(':id')
  async remove(
    @Req() request: Request,
    @Res() response: Response,
    @Param('id') id: string,
  ) {
    try {
      await this.docterService.remove(+id);

      response.status(200).json({
        status: 'success',
        message: 'Doctor deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting doctor:', error);
      response.status(400).json({
        status: 'failed',
        message: 'Error deleting doctor',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: error.message,
      });
    }
    return this.docterService.remove(+id);
  }
}
