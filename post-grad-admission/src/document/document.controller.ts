
import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { multerOptions } from 'src/file-upload/upload';
import { Document } from './schemas/document.schema';


@Controller('document')
export class DocumentController {
  constructor(
    @InjectModel(Document.name) private readonly documentModel: Model<Document>,
  ) {}

  @Post('/upload-photo')
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  public async uploadphoto(
    @Body('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Express.Multer.File> {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
      const photofilePath = path.join('uploads', file.filename);

      const result = await this.documentModel.findByIdAndUpdate(
        id,
        { photo: photofilePath },
        { new: true },
      );

      if (!result) {
        throw new BadRequestException('Examination not found');
      }

      return file;
    } catch (e) {
      throw new HttpException(
        'Error in <FileControllers.upload>',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/upload-sign')
  @UseInterceptors(FileInterceptor('sign', multerOptions))
  public async uploadsign(
    @Body('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Express.Multer.File> {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      const signfilePath = path.join('uploads', file.filename);

      // Update examination details with file path
      const result = await this.documentModel.findByIdAndUpdate(
        id,
        { signature: signfilePath },
        { new: true },
      );

      if (!result) {
        throw new BadRequestException('Examination not found');
      }

      return file;
    } catch (e) {
      throw new HttpException(
        'Error in <FileControllers.upload>',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/upload-aadhar')
  @UseInterceptors(FileInterceptor('aadhar', multerOptions))
  public async uploadaadhar(
    @Body('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Express.Multer.File> {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      const aadharfilePath = path.join('uploads', file.filename);

      // Update examination details with file path
      const result = await this.documentModel.findByIdAndUpdate(
        id,
        { aadhar_no: aadharfilePath },
        { new: true },
      );

      if (!result) {
        throw new BadRequestException('aadhar not uploaded');
      }

      return file;
    } catch (e) {
      throw new HttpException(
        'Error in <FileControllers.upload>',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
