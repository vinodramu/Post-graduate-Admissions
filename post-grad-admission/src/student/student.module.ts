import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Education, EducationSchema } from '../education/schema/education.schema';
import { Application, ApplicationSchema } from 'src/application/schemas/application.schema';
import { Document, DocumentSchema } from 'src/document/schemas/document.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: Application.name, schema: ApplicationSchema },
      { name: Document.name, schema: DocumentSchema }
    ]),
  ],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
