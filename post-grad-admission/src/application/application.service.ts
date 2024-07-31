import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateApplicationsDto } from './schemas/create-application.dto';
import { Application, ApplicationsDetails } from './schemas/application.schema';
import { UpdateApplicationsDto } from './schemas/update-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
   
    @InjectModel(ApplicationsDetails.name)
    private applicationModel: Model<ApplicationsDetails>
  ) {}

  async create(
 
    createApplicationDetailsDto: CreateApplicationsDto
  ): Promise<ApplicationsDetails> {
    const createApplicationDto = new this.applicationModel(
      createApplicationDetailsDto
    );
    return createApplicationDto.save();
  }

  
 
  async getApplicationDetailsByStudentId(
    studentId: string
  ): Promise<ApplicationsDetails> {
    const applicationDetails = await this.applicationModel
      .findOne({ studentId })
      .exec();
  
      if (!applicationDetails) {
        return { studentId, application: [] } as unknown as ApplicationsDetails; // Return an empty array inside an object with the application field
      }
    
    return applicationDetails;
  }

  async updateApplicationDetails(
    studentId: string,
    updateData: Partial<UpdateApplicationsDto>
  ): Promise<ApplicationsDetails> {
    const applicationDetails = await this.applicationModel.findOne({ studentId });

    if (!applicationDetails) {
      throw new NotFoundException(`ApplicationDetails not found for student ID ${studentId}`);
    }

    applicationDetails.application = []; // Empty the application array

    if (updateData.application) {
      // Convert the DTO to the Application type
      const newApplications: Application[] = updateData.application.map(app => ({
        courseId: app.courseId
      })) as Application[]
      applicationDetails.application = newApplications;
    }

    const updatedEducationalDetails = await applicationDetails.save();
    return updatedEducationalDetails;
  }
}
