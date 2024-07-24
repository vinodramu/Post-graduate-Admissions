import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from './schemas/application.schema';
import { Student } from 'src/student/schemas/student.schema';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('/create')
  async createApplication(@Body() createApplicationDto: any ) {
    return this.applicationService.createApplication(createApplicationDto);
  }

  @Get()
  async findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.applicationService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() application: Application) {
    return this.applicationService.update(id, application);
  }

//   @Delete(':id')
//   async delete(@Param('id') id: string) {
//     return this.applicationService.delete(id);
//   }
}
