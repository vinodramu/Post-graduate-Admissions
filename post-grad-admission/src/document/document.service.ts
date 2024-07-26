import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentEntity } from 'src/document/schemas/document.schema';
import { GridFSService } from 'src/file-upload/gridFS.service';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(DocumentEntity.name) private documentEntityModel: Model<DocumentEntity>,
    private readonly gridFSService: GridFSService,
  ) {}

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
