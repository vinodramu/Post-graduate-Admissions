import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  UseInterceptors,
  UploadedFiles,
  Res,
  Put,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { DocumentEntity } from './schemas/document.schema';
import { GridFSService } from 'src/file-upload/gridFS.service';
import { Response, Express } from 'express';
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

  @Get('studentPhoto/:documentId')
  async getStudentPhotoByDocumentId(
    @Param('documentId') documentId: string,
    @Res() res: Response
  ): Promise<void> {
    const document = await this.documentEntityModel.findById(documentId).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }

    const studentPhoto = document.studentPhoto;
    const fileStreamstudent =
      await this.gridFSService.getFileStream(studentPhoto);
    fileStreamstudent.pipe(res);
  }

  @Get('aadharPhoto/:documentId')
  async getAadharPhotoByDocumentId(
    @Param('documentId') documentId: string,
    @Res() res: Response
  ): Promise<void> {
    const document = await this.documentEntityModel.findById(documentId).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }

    const aadharPhoto = document.aadharPhoto;
    const fileStreaadhar = await this.gridFSService.getFileStream(aadharPhoto);
    fileStreaadhar.pipe(res);
  }

  @Get('signature/:documentId')
  async getSignatureByDocumentId(
    @Param('documentId') documentId: string,
    @Res() res: Response
  ): Promise<void> {
    const document = await this.documentEntityModel.findById(documentId).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }
    const signature = document.signature;
    const fileStresignature = await this.gridFSService.getFileStream(signature);
    fileStresignature.pipe(res);
  }

  @Get('10thCertificate/:documentId')
  async getTenthCertificateByDocumentId(
    @Param('documentId') documentId: string,
    @Res() res: Response
  ): Promise<void> {
    const document = await this.documentEntityModel.findById(documentId).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }
    const tenthCertificate = document.tenthCertificate;
    const fileStreTenthCertificate =
      await this.gridFSService.getFileStream(tenthCertificate);
    fileStreTenthCertificate.pipe(res);
  }

  @Get('12thCertificate/:documentId')
  async getTwelthCertificateByDocumentId(
    @Param('documentId') documentId: string,
    @Res() res: Response
  ): Promise<void> {
    const document = await this.documentEntityModel.findById(documentId).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }
    const twelthCertificate = document.twelthCertificate;
    const fileStreTwelthCertificate =
      await this.gridFSService.getFileStream(twelthCertificate);
    fileStreTwelthCertificate.pipe(res);
  }

  @Get('graduationCertificate/:documentId')
  async getGraduationCertificateByDocumentId(
    @Param('documentId') documentId: string,
    @Res() res: Response
  ): Promise<void> {
    const document = await this.documentEntityModel.findById(documentId).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }
    const graduationCertificate = document.graduationCertificate;
    const fileStreGraduationCertificate =
      await this.gridFSService.getFileStream(graduationCertificate);
    fileStreGraduationCertificate.pipe(res);
  }

  @Put('/:documentId')
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
  async updateFilesByDocumentId(
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
  ): Promise<void> {
    const document = await this.documentEntityModel.findById(documentId).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }
    for (const [fieldName, fileArray] of Object.entries(files)) {
      if (fileArray && fileArray.length > 0) {
        const file = fileArray[0];
        const fileStream = file.buffer;
        const fileType = file.mimetype;
        if (document[fieldName]) {
          await this.gridFSService.deleteFile(document[fieldName]);
        }
        const uploadedFile = await this.gridFSService.uploadFile(
          file.originalname,
          fileStream,
          fileType
        );
        document[fieldName] = uploadedFile.id;
      }
    }

    await document.save();
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
