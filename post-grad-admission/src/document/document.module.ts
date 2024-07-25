import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Document, DocumentSchema } from './schemas/document.schema';
import { DocumentController } from './document.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  providers: [ ],
  controllers: [DocumentController],
})
export class DocumentModule {}
