import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('/:id')
  async getDocumentWithFiles(@Param('id') documentId: string): Promise<any> {
    try {
      const result = await this.documentService.getDocumentWithFiles(documentId);
      return result;
    } catch (error) {
      throw new NotFoundException(`Document with ID ${documentId} not found`);
    }
  }
}
