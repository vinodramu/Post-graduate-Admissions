import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './schemas/application.schema';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { Student, StudentSchema } from 'src/student/schemas/student.schema';
import { StudentService } from 'src/student/student.service';
import { Document, DocumentSchema } from 'src/document/schemas/document.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Application.name, schema: ApplicationSchema },
        { name: Student.name, schema: StudentSchema },
        { name: Document.name, schema: DocumentSchema }
    ]),
  ],
  providers: [ApplicationService , StudentService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
