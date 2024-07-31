// personal-details.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonalDetails } from './schemas/personalDetails.schema';
import { CreatePersonalDetailsDto } from './schemas/create-personal-details.dto';
import { Address } from 'src/Address/schemas/address.schema';
import { EducationalDetails } from 'src/education/schema/education.schema';
import { DocumentEntity } from 'src/document/schemas/document.schema';
import { UpdatePersonalDetailsDto } from './schemas/update-personal-details.dto';
import { ApplicationsDetails } from 'src/application/schemas/application.schema';

@Injectable()
export class PersonalDetailsService {
  constructor(
    @InjectModel(PersonalDetails.name)
    private personalDetailsModel: Model<PersonalDetails>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
    @InjectModel(EducationalDetails.name)
    private educationalDetailsModel: Model<EducationalDetails>,
    @InjectModel(ApplicationsDetails.name) private applicationModel: Model<ApplicationsDetails>,
    @InjectModel(DocumentEntity.name)
    private documentEntityModel: Model<DocumentEntity>
  ) {}

  async create(
    createPersonalDetailsDto: CreatePersonalDetailsDto
  ): Promise<PersonalDetails> {
    const createdPersonalDetails = new this.personalDetailsModel(
      createPersonalDetailsDto
    );
    return createdPersonalDetails.save();
  }

  async updatePersonalDetails(
    personalDetailsId: string,
    updatePersonalDetailsDto: UpdatePersonalDetailsDto
  ): Promise<PersonalDetails> {
    const updatedPersonalDetails = await this.personalDetailsModel
      .findByIdAndUpdate(personalDetailsId, updatePersonalDetailsDto, {
        new: true,
      })
      .exec();
    if (!updatedPersonalDetails) {
      throw new NotFoundException(
        `Personal details with ID ${personalDetailsId} not found`
      );
    }
    return updatedPersonalDetails;
  }

  async findByEmail(email: string): Promise<PersonalDetails> {
    const personalDetail = await this.personalDetailsModel
      .findOne({ email })
      .exec();
    if (!personalDetail) {
      throw new NotFoundException('Personal detail not found');
    }
    return personalDetail;
  }

  async getAllDataByStudentId(studentId: string): Promise<any> {
    const personalDetails = await this.personalDetailsModel
      .findById(studentId)
      .exec();
    if (!personalDetails) {
      throw new NotFoundException(
        `Personal details with ID ${studentId} not found`
      );
    }

    const address = await this.addressModel.findOne({ studentId }).exec();
    const educationalDetails = await this.educationalDetailsModel
      .findOne({ studentId })
      .exec();
    const applications = await this.applicationModel.find({ studentId }).exec();
    const documents = await this.documentEntityModel
      .findOne({ studentId })
      .exec();

    return {
      personalDetails,
      address,
      educationalDetails,
      applications,
      documents,
    };
  }

  async getPersonalDetailsById(
    personalDetailsId: string
  ): Promise<PersonalDetails> {
    const personalDetails = await this.personalDetailsModel
      .findById(personalDetailsId)
      .exec();
    if (!personalDetails) {
      throw new NotFoundException(
        `Personal details with ID ${personalDetailsId} not found`
      );
    }
    return personalDetails;
  }
}
