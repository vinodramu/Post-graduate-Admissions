import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { DocumentEntity } from './schemas/document.schema';
import { GridFSService } from 'src/file-upload/gridFS.service';
import { Response } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('documents')
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    @InjectModel(DocumentEntity.name)
    private documentEntityModel: Model<DocumentEntity>,
    private readonly gridFSService: GridFSService
  ) {}

  @Post('upload/:studentId')
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
    @UploadedFiles()
    files: {
      aadharPhoto?: Express.Multer.File[];
      studentPhoto?: Express.Multer.File[];
      signature?: Express.Multer.File[];
      graduationCertificate?: Express.Multer.File[];
      twelthCertificate?: Express.Multer.File[];
      tenthCertificate?: Express.Multer.File[];
    }
  ): Promise<DocumentEntity> {
    return this.documentService.uploadFiles(studentId, files);
  }

  @Get()
  async getAllDocuments(): Promise<DocumentEntity[]> {
    return this.documentService.getAllDocuments();
  }

  @Get('/:documentId')
  async getFilesByDocumentId(
    @Param('documentId') documentId: string,
    @Res() res: Response
  ): Promise<void> {
    const document = await this.documentEntityModel.findById(documentId).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }

    const studentPhoto = document.studentPhoto;
    const aadharPhoto = document.aadharPhoto;
    // if (!fileId) {
    //   throw new NotFoundException(`File not found in document`);
    // }

    const fileStreamstudent =
      await this.gridFSService.getFileStream(studentPhoto);
    const fileStreaadhar = await this.gridFSService.getFileStream(aadharPhoto);
    fileStreamstudent.pipe(res);
    fileStreaadhar.pipe(res);
  }

  @Get('file/:fileId')
  async getFile(
    @Param('fileId') fileId: string,
    @Res() res: Response
  ): Promise<void> {
    const fileStream = await this.gridFSService.getFileStream(fileId);
    fileStream.pipe(res);
  }
}
