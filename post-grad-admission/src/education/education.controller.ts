// educational-details.controller.ts
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EducationalDetailsService } from './education.service';
import { CreateEducationalDetailsDto } from './schema/create-educational-details.dto';
import { EducationalDetails } from './schema/education.schema';
import { UpdateEducationalDetailsDto } from './schema/update-educational-details.dto';

@Controller('educationalDetails')
export class EducationalDetailsController {
  constructor(
    private readonly educationalDetailsService: EducationalDetailsService
  ) {}

  @Post()
  async create(
    @Body() createEducationalDetailsDto: CreateEducationalDetailsDto
  ): Promise<EducationalDetails> {
    return this.educationalDetailsService.create(createEducationalDetailsDto);
  }

  @Get('/:studentId')
  async getEducationalDetailsByStudentId(
    @Param('studentId') studentId: string
  ): Promise<EducationalDetails> {
    try {
      const educationalDetails =
        await this.educationalDetailsService.getEducationalDetailsByStudentId(
          studentId
        );
      return educationalDetails;
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':studentId')
  async update(
    @Param('studentId') studentId: string,
    @Body() updateData: Partial<UpdateEducationalDetailsDto>
  ): Promise<EducationalDetails> {
    return this.educationalDetailsService.updateEducationalDetails(
      studentId,
      updateData
    );
  }
}
