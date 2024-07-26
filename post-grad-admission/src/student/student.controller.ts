import { Controller } from '@nestjs/common';
import { StudentService } from './student.service';
import { multerOptions } from 'src/file-upload/upload';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // @Post('create')
  // @UseInterceptors(FileFieldsInterceptor([
  //   { name: 'aadhar_photo', maxCount: 1 },
  //   { name: 'student_photo', maxCount: 1 },
  //   { name: 'signature', maxCount: 1 },
  //   { name: 'degree_certificate', maxCount: 1 },
  //   { name: 'intermediate_certificate', maxCount: 1 },
  //   { name: 'tenth_certificate', maxCount: 1 },
  // ]))
  // async createStudentWithApplication(
  //   @Body('student') studentString: string,
  //   @Body('application') applicationString: string,
  //   @UploadedFiles() files: { [key: string]: Express.Multer.File }
  // ): Promise<any> {
  //   try {
  //     const student: Student = JSON.parse(studentString);
  //     const applications: Partial<Application>[] = JSON.parse(applicationString);

  //     const result = await this.studentService.createStudentWithApplication(
  //       student,
  //       applications,
  //       files,
  //     );
  //     return result;
  //   } catch (e) {
  //     throw new BadRequestException('Error creating student and applications');
  //   }
  // }

  // @Get('/get')
  // async findAll(): Promise<Student[]> {
  //   return this.studentService.findAll();
  // }

  // @Get('by-application/:id')
  // async getStudentByApplicationId(@Param('id') id: string): Promise<Student> {
  //   try {
  //     const student = await this.studentService.findStudentByApplicationId(id);
  //     return student;
  //   } catch (e) {
  //     throw new NotFoundException(e.message);
  //   }
  // }
}
