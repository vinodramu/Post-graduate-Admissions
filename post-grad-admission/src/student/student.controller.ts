import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './schemas/student.schema';
import { Application } from 'src/application/schemas/application.schema';
import { Document } from 'src/document/schemas/document.schema';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/file-upload/upload';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'aadhar_photo', maxCount: 1 },
    { name: 'student_photo', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
    { name: 'degree_certificate', maxCount: 1 },
    { name: 'intermediate_certificate', maxCount: 1 },
    { name: 'tenth_certificate', maxCount: 1 }, 
  ]))
  async createStudentWithApplication(
    @Body('student') studentJson: string,
    @Body('application') applicationJson: string,
    @UploadedFiles() files: { [key: string]: Express.Multer.File }
  ): Promise<any> {
    return this.studentService.createStudentWithApplication(
      studentJson,
      applicationJson,
      files,
    );
  }

  @Get('/get')
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.studentService.findOne(id);
  // }

  // @Put(':id')
  // async update(@Param('id') id: string, @Body() student: Student) {
  //   return this.studentService.update(id, student);
  // }

  //   @Delete(':id')
  //   async delete(@Param('id') id: string) {
  //     return this.studentService.delete(id);
  //   }
}
