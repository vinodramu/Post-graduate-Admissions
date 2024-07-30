import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from './schemas/application.schema';
import { CreateApplicationDto } from './schemas/create-application.dto';
import { UpdateApplicationDto } from './schemas/update-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name) private applicationModel: Model<Application>
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto
  ): Promise<Application> {
    Logger.log(`Start : ApplicationService : create `);
    const createdApplication = new this.applicationModel(createApplicationDto);
    Logger.log(`End : ApplicationService : create `);
    return createdApplication.save();
  }

  async getApplicationsByStudentId(studentId: string): Promise<Application[]> {
    Logger.log(
      `Start : ApplicationService : getApplicationsByStudentId  id : ${studentId}`
    );
    const applications = await this.applicationModel.find({ studentId }).exec();
    if (!applications || applications.length === 0) {
      throw new NotFoundException(
        `No applications found for student ID ${studentId}`
      );
    }
    Logger.log(
      `End : ApplicationService : getApplicationsByStudentId  id : ${studentId}`
    );
    return applications;
  }

  async updateApplicationByStudentId(
    studentId: string,
    updateApplication: UpdateApplicationDto
  ): Promise<Application | any> {
    Logger.log(
      `Start : ApplicationService : updateApplicationByStudentId  id : ${studentId} value : ${updateApplication}`
    );
    const app: any = await this.applicationModel.find().exec();
    app.filter((application) => application.studentId == studentId);
    Logger.log(app);
    const application = await this.applicationModel
      .updateOne(app._id, updateApplication, {
        new: true,
      })
      .exec();
    if (!application) {
      throw new NotFoundException(
        `No applications found for student ID ${studentId}`
      );
    }
    Logger.log(
      `End : ApplicationService : updateApplicationByStudentId  id : ${studentId} value : ${updateApplication}`
    );
    return application;
  }
}
