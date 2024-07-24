import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './schemas/student.schema';
import { Application } from 'src/application/schemas/application.schema';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/create')
  async createStudentWithApplication(
    @Body() body: { student: Student; application: Partial<Application> },
  ): Promise<Application> {
    const { student, application } = body;

    // Call the service method to create student and application
    return this.studentService.createStudentWithApplication(student, application);
  }

  // @Get()
  // async findAll() {
  //   return this.studentService.findAll();
  // }

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
