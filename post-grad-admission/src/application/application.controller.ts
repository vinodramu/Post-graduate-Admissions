import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
    return this.applicationService.create(createApplicationDto);
  }

  @Get('/:studentId')
  async getApplicationsByStudentId(
    @Param('studentId') studentId: string
  ): Promise<Application[]> {
    try {
      const applications =
        await this.applicationService.getApplicationsByStudentId(studentId);
      return applications;
    } catch (error) {
      console.log(error);
    }
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto
  ): Promise<Application> {
    return this.applicationService.update(id, updateApplicationDto);
  }
}
