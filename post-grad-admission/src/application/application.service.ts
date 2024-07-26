import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { isValidObjectId, Model, Types } from 'mongoose';
import { Application } from './schemas/application.schema';
import { StudentService } from 'src/student/student.service';
import { Student } from 'src/student/schemas/student.schema';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<Application>,
    private studentService: StudentService
  ) {}

  // async createApplication(createApplicationDto: Application): Promise<Application> {
  //   // Create and save the application
  //   const createdApplication = new this.applicationModel(createApplicationDto);
  //   const application = await createdApplication.save();
  //   const { studentId } = application;
  //   // Ensure the student exists and add the application to the student
  //   const student = await this.studentService.findStudentById(studentId as any);
  //   if (!student) {
  //     throw new Error('Student not found');
  //   }

  //   student.applicationsIds.push(application._id as any);
  //   await student.save();

  //   return application;
  // }

  async findByStudentId(studentId: string): Promise<Application[]> {
    console.log('Received studentId:', studentId);
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error(`Invalid studentId: ${studentId}`);
    }
    const objectId = new mongoose.Types.ObjectId(studentId);
    return this.applicationModel.find({ studentId: objectId }).exec();
  }

  async findById(applicationId: string): Promise<Application> {
    const objectId = new Types.ObjectId(applicationId);
    const application = await this.applicationModel.findById(objectId).exec();
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  }

  async updateById(
    applicationId: string,
    updateData: Partial<Application>
  ): Promise<Application> {
    const objectId = new Types.ObjectId(applicationId);
    const updatedApplication = await this.applicationModel
      .findByIdAndUpdate(objectId, updateData, { new: true })
      .exec();
    if (!updatedApplication) {
      throw new NotFoundException('Application not found');
    }
    return updatedApplication;
  }

  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }

  async findOne(id: string): Promise<Application> {
    return this.applicationModel.findById(id).exec();
  }

  async update(id: string, application: Application): Promise<Application> {
    return this.applicationModel
      .findByIdAndUpdate(id, application, { new: true })
      .exec();
  }

  //   async delete(id: string): Promise<any> {
  //     return this.applicationModel.findByIdAndRemove(id).exec();
  //   }
}
