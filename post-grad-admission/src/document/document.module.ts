import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocumentEntity, DocumentSchema } from './schemas/document.schema';
import { GridFSService } from 'src/file-upload/gridFS.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocumentEntity.name, schema: DocumentSchema },
    ]),
  ],
  providers: [DocumentService,GridFSService],
  controllers: [DocumentController],
})
export class DocumentModule {}
