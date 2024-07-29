import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  InternalServerErrorException,
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

  @Get('/:studentId')
  async getApplicationsByStudentId(
    @Param('studentId') studentId: string
  ): Promise<Application[]> {
    try {
      return await this.applicationService.getApplicationsByStudentId(
        studentId
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to retrieve applications');
    }
  }

  @Put('/:studentId')
  async updateApplicationByStudentId(
    @Param('studentId') studentId: string,
    @Body() updateApplicationDto: UpdateApplicationDto
  ): Promise<Application> {
    try {
      return await this.applicationService.updateApplicationByStudentId(
        studentId,
        updateApplicationDto
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update application');
    }
  }
}
