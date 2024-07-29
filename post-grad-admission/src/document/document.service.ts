import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Express } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentEntity } from 'src/document/schemas/document.schema';
import { GridFSService } from 'src/file-upload/gridFS.service';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(DocumentEntity.name)
    private documentEntityModel: Model<DocumentEntity>,
    private readonly gridFSService: GridFSService
  ) {}

  async uploadFiles(
    studentId: string,
    files: {
      aadharPhoto?: Express.Multer.File[];
      studentPhoto?: Express.Multer.File[];
      signature?: Express.Multer.File[];
      graduationCertificate?: Express.Multer.File[];
      twelthCertificate?: Express.Multer.File[];
      tenthCertificate?: Express.Multer.File[];
    }
  ): Promise<DocumentEntity> {
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

    const document = new this.documentEntityModel({
      studentId,
      aadharPhoto: uploadedFiles[0]?.id ?? null,
      studentPhoto: uploadedFiles[1]?.id ?? null,
      signature: uploadedFiles[2]?.id ?? null,
      graduationCertificate: uploadedFiles[3]?.id ?? null,
      twelthCertificate: uploadedFiles[4]?.id ?? null,
      tenthCertificate: uploadedFiles[5]?.id ?? null,
    });

    return document.save();
  }

  async getAllDocuments(): Promise<DocumentEntity[]> {
    return this.documentEntityModel.find().exec();
  }

  // async getFileByDocumentId(documentId: string): Promise<NodeJS.ReadableStream> {
  //   const document = await this.documentEntityModel.findById(documentId).exec();
  //   if (!document) {
  //     throw new NotFoundException(`Document with ID ${documentId} not found`);
  //   }

  //   const fileId = document.studentPhoto;
  //   if (!fileId) {
  //     throw new NotFoundException(`File not found in document`);
  //   }

  //   const fileStream = await this.gridFSService.getFileStream(fileId);
  //   fileStream.pipe(res);

  // }

  async getDocumentWithFiles(documentId: string): Promise<any> {
    // Find the document by ID
    const document = await this.documentEntityModel.findById(documentId);

    if (!document) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }

    // Fetch the files from GridFS
    const fileKeys = [
      document.aadharPhoto,
      document.studentPhoto,
      document.signature,
      document.graduationCertificate,
      document.twelthCertificate,
      document.tenthCertificate,
    ];

    // Fetch file data from GridFS
    const files = {};
    for (const key of fileKeys) {
      if (key) {
        files[key] = await this.gridFSService.getFile(key);
      }
    }

    return {
      document,
      files,
    };
  }
}
