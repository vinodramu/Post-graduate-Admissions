import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './schemas/student.schema';
import { Application } from 'src/application/schemas/application.schema';

@Injectable()
export class StudentService {
  constructor( @InjectModel(Student.name) private studentModel: Model<Student>,
  @InjectModel(Application.name) private applicationModel: Model<Application>) {}

  async createStudentWithApplication(student: Student, applicationData: Partial<Application>): Promise<Application> {

    const createdStudent = new this.studentModel(student);
    const savedStudent = await createdStudent.save();
  
    const application = new this.applicationModel({
      ...applicationData,
      studentId: savedStudent._id,
    });

    const savedApplication = await application.save();
    savedStudent.applicationsIds = savedStudent.applicationsIds || [];
    savedStudent.applicationsIds.push(savedApplication._id as any);
    await savedStudent.save();
    return savedApplication;
  }

  async findAllStudents(): Promise<Student[]> {
    return this.studentModel.find().populate('applications').exec();
  }

  async findOne(id: string): Promise<Student> {
    return this.studentModel.findById(id).exec();
  }
  async findStudentById(studentId: string): Promise<Student | null> {
    return this.studentModel.findById(studentId).exec();
  }
}
