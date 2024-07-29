// personal-details.controller.ts
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { PersonalDetailsService } from './personalDetails.service';
import { CreatePersonalDetailsDto } from './schemas/create-personal-details.dto';
import { PersonalDetails } from './schemas/personalDetails.schema';

@Controller('personalDetails')
export class PersonalDetailsController {
  constructor(
    private readonly personalDetailsService: PersonalDetailsService
  ) {}

  @Post()
  async create(
    @Body() createPersonalDetailsDto: CreatePersonalDetailsDto
  ): Promise<PersonalDetails> {
    return this.personalDetailsService.create(createPersonalDetailsDto);
  }

  @Get('/:email')
  async findByEmail(@Param('email') email: string): Promise<PersonalDetails> {
    return this.personalDetailsService.findByEmail(email);
  }

  @Get('all/:studentId')
  async getAllDataByStudentId(@Param('studentId') studentId: string) {
    try {
      return await this.personalDetailsService.getAllDataByStudentId(studentId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('getById/:personalDetailsId')
  async getPersonalDetailsById(
    @Param('personalDetailsId') personalDetailsId: string
  ): Promise<any> {
    try {
      const personalDetails =
        await this.personalDetailsService.getPersonalDetailsById(
          personalDetailsId
        );
      return personalDetails;
    } catch (error) {
      throw new NotFoundException(
        `Personal details with ID ${personalDetailsId} not found`
      );
    }
  }
}
