// application.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from './schemas/application.schema';
import { CreateApplicationDto } from './schemas/create-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<Application>
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto
  ): Promise<Application> {
    const createdApplication = new this.applicationModel(createApplicationDto);
    return createdApplication.save();
  }

  async getApplicationsByStudentId(studentId: string): Promise<Application[]> {
    const applications = await this.applicationModel.find({ studentId }).exec();
    if (!applications || applications.length === 0) {
      throw new NotFoundException(
        `No applications found for student ID ${studentId}`
      );
    }
    return applications;
  }
}
