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
import { ApplicationsDetails } from './schemas/application.schema';
import { CreateApplicationsDto } from './schemas/create-application.dto';
import { UpdateApplicationsDto } from './schemas/update-application.dto';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('/create')
  async create(
    @Body() createApplicationDetailsDto: CreateApplicationsDto
  ): Promise<ApplicationsDetails> {
    return this.applicationService.create(createApplicationDetailsDto);
  }
  
  @Get('getApplicationByStudentId/:studentId')
  async getApplicationDetailsByStudentId(
    @Param('studentId') studentId: string
  ): Promise<ApplicationsDetails> {
    const applicationDetails = await this.applicationService.getApplicationDetailsByStudentId(studentId);
    if (!applicationDetails) {
      throw new NotFoundException(`Application details not found for student ID ${studentId}`);
    }
    return applicationDetails;
  }

  @Put(':studentId')
  async update(
    @Param('studentId') studentId: string,
    @Body() updateData: Partial<UpdateApplicationsDto>
  ): Promise<ApplicationsDetails> {
    return this.applicationService.updateApplicationDetails(studentId, updateData);
  }

}
