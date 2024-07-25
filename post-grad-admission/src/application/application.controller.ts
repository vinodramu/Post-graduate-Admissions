import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, Patch } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from './schemas/application.schema';
import { Student } from 'src/student/schemas/student.schema';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  // @Post('/create')
  // async createApplication(@Body() createApplicationDto: any ) {
  //   return this.applicationService.createApplication(createApplicationDto);
  // }

  @Get('/student/:studentId')
  async findByStudentId(@Param('studentId') studentId: string): Promise<Application[]> {
    const applications = await this.applicationService.findByStudentId(studentId);
    if (!applications || applications.length === 0) {
      throw new NotFoundException('No applications found for this student');
    }
    return applications;
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<Application> {
    const application = await this.applicationService.findById(id);
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Application>,
  ): Promise<Application> {
    const updatedApplication = await this.applicationService.updateById(id, updateData);
    if (!updatedApplication) {
      throw new NotFoundException('Application not found');
    }
    return updatedApplication;
  }

  @Get()
  async findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.applicationService.findOne(id);
  }
}
