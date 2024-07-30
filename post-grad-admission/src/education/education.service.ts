// educational-details.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EducationalDetails } from './schema/education.schema';
import { CreateEducationalDetailsDto } from './schema/create-educational-details.dto';
import { UpdateEducationalDetailsDto } from './schema/update-educational-details.dto';

@Injectable()
export class EducationalDetailsService {
  constructor(
    @InjectModel(EducationalDetails.name)
    private educationalDetailsModel: Model<EducationalDetails>
  ) {}

  async create(
    createEducationalDetailsDto: CreateEducationalDetailsDto
  ): Promise<EducationalDetails> {
    const createdEducationalDetails = new this.educationalDetailsModel(
      createEducationalDetailsDto
    );
    return createdEducationalDetails.save();
  }

  async getEducationalDetailsByStudentId(
    studentId: string
  ): Promise<EducationalDetails> {
    const educationalDetails = await this.educationalDetailsModel
      .findOne({ studentId })
      .exec();
    if (!educationalDetails) {
      throw new NotFoundException(
        `Educational details not found for student ID ${studentId}`
      );
    }
    return educationalDetails;
  }

  async updateEducationalDetails(
    studentId: string,
    updateData: Partial<UpdateEducationalDetailsDto>
  ): Promise<EducationalDetails> {
    const updatedEducationalDetails =
      await this.educationalDetailsModel.findOneAndUpdate(
        { studentId },
        { $set: updateData },
        { new: true, runValidators: true }
      );

    if (!updatedEducationalDetails) {
      throw new NotFoundException(
        `EducationalDetails not found for student ID ${studentId}`
      );
    }

    return updatedEducationalDetails;
  }
}
