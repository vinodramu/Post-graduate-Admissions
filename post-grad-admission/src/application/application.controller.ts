import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from './schemas/application.schema';
import { CreateApplicationDto } from './schemas/create-application.dto';
import { UpdateApplicationDto } from './schemas/update-application.dto';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async create(
    @Body() createApplicationDto: CreateApplicationDto
  ): Promise<Application> {
    try {
      return await this.applicationService.create(createApplicationDto);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create application');
    }
  }

  @Get('getapplicationByStudentId/:studentId')
  async getApplicationsByStudentId(
    @Param('studentId') studentId: string
  ): Promise<Application[]> {
    try {
      const applications =
        await this.applicationService.getApplicationsByStudentId(studentId);
      return applications;
    } catch (error) {
      console.log(error);
      console.error(error);
      throw new InternalServerErrorException('Failed to retrieve applications');
    }
  }

  @Put('student/:studentId')
  async updateApplicationByStudentId(
    @Param('studentId') studentId: string,
    @Body() updateApplication: UpdateApplicationDto
  ): Promise<Application> {
    try {
      return await this.applicationService.updateApplicationByStudentId(
        studentId,
        updateApplication
      );
    } catch (error) {
      throw new NotFoundException(
        `Error updating application for student ID ${studentId}`
      );
    }
  }
}
