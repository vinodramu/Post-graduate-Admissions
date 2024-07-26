// controllers/registration.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from '../dto/create-registration.dto';
import { GridFSService } from 'src/file-upload/gridFS.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('register')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly gridFSService: GridFSService
  ) {}

  @Post()
  async register(
    @Body() createRegistrationDto: CreateRegistrationDto
  ): Promise<any> {
    return this.registrationService.register(createRegistrationDto);
  }

  @Post('upload/:documentId/:studentId')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'aadharPhoto', maxCount: 1 },
      { name: 'studentPhoto', maxCount: 1 },
      { name: 'signature', maxCount: 1 },
      { name: 'graduationCertificate', maxCount: 1 },
      { name: 'twelthCertificate', maxCount: 1 },
      { name: 'tenthCertificate', maxCount: 1 },
    ])
  )
  async uploadFiles(
    @Param('studentId') studentId: string,
    @Param('documentId') documentId: string,
    @UploadedFiles()
    files: {
      aadharPhoto?: Express.Multer.File[];
      studentPhoto?: Express.Multer.File[];
      signature?: Express.Multer.File[];
      graduationCertificate?: Express.Multer.File[];
      twelthCertificate?: Express.Multer.File[];
      tenthCertificate?: Express.Multer.File[];
    }
  ): Promise<any> {
    if (!studentId) {
      throw new BadRequestException('Student ID is required');
    }

    const fileBuffers = {
      aadharPhoto: files.aadharPhoto ? files.aadharPhoto[0].buffer : null,
      studentPhoto: files.studentPhoto ? files.studentPhoto[0].buffer : null,
      signature: files.signature ? files.signature[0].buffer : null,
      graduationCertificate: files.graduationCertificate
        ? files.graduationCertificate[0].buffer
        : null,
      twelthCertificate: files.twelthCertificate
        ? files.twelthCertificate[0].buffer
        : null,
      tenthCertificate: files.tenthCertificate
        ? files.tenthCertificate[0].buffer
        : null,
    };

    // Upload files to GridFS
    const uploadedFiles = await Promise.all([
      fileBuffers.aadharPhoto
        ? this.gridFSService.uploadFile(
            'aadharPhoto',
            fileBuffers.aadharPhoto,
            'image/jpeg'
          )
        : null,
      fileBuffers.studentPhoto
        ? this.gridFSService.uploadFile(
            'studentPhoto',
            fileBuffers.studentPhoto,
            'image/jpeg'
          )
        : null,
      fileBuffers.signature
        ? this.gridFSService.uploadFile(
            'signature',
            fileBuffers.signature,
            'image/jpeg'
          )
        : null,
      fileBuffers.graduationCertificate
        ? this.gridFSService.uploadFile(
            'graduationCertificate',
            fileBuffers.graduationCertificate,
            'application/pdf'
          )
        : null,
      fileBuffers.twelthCertificate
        ? this.gridFSService.uploadFile(
            'twelthCertificate',
            fileBuffers.twelthCertificate,
            'application/pdf'
          )
        : null,
      fileBuffers.tenthCertificate
        ? this.gridFSService.uploadFile(
            'tenthCertificate',
            fileBuffers.tenthCertificate,
            'application/pdf'
          )
        : null,
    ]);

    const fileData = {
      studentId,
      aadharPhoto: uploadedFiles[0]?.filename,
      studentPhoto: uploadedFiles[1]?.filename,
      signature: uploadedFiles[2]?.filename,
      graduationCertificate: uploadedFiles[3]?.filename,
      twelthCertificate: uploadedFiles[4]?.filename,
      tenthCertificate: uploadedFiles[5]?.filename,
    };

    await this.registrationService.createOrUpdateDocument(
      documentId,
      studentId,
      fileData
    );

    return {
      message: 'Files uploaded and document record updated successfully',
    };
  }

  @Get('/:id')
  async getStudentDetails(@Param('id') id: string) {
    const student = await this.registrationService.getStudentDetails(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }
}
