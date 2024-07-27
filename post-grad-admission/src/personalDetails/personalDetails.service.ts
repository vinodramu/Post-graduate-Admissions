// personal-details.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonalDetails } from './schemas/personalDetails.schema';
import { CreatePersonalDetailsDto } from './schemas/create-personal-details.dto';


@Injectable()
export class PersonalDetailsService {
  constructor(
    @InjectModel(PersonalDetails.name) private personalDetailsModel: Model<PersonalDetails>,
  ) {}

  async create(createPersonalDetailsDto: CreatePersonalDetailsDto): Promise<PersonalDetails> {
    const createdPersonalDetails = new this.personalDetailsModel(createPersonalDetailsDto);
    return createdPersonalDetails.save();
  }
}
