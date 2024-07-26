// education.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Education } from './schema/education.schema'; // Adjust the import path as necessary

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education.name)
    private readonly educationModel: Model<Education>
  ) {}

  // Method to create a new education record
  async createEducation(educationData: Partial<Education>): Promise<Education> {
    const createdEducation = new this.educationModel(educationData);
    return await createdEducation.save();
  }

  // Method to find an education record by ID
  async findEducationById(id: string): Promise<Education | null> {
    return await this.educationModel.findById(id).exec();
  }

  // Method to update an education record by ID
  async updateEducation(
    id: string,
    educationData: Partial<Education>
  ): Promise<Education | null> {
    return await this.educationModel
      .findByIdAndUpdate(id, educationData, { new: true })
      .exec();
  }
}
