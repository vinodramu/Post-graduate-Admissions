// educational-details.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EducationalDetailsService } from './education.service';
import { CreateEducationalDetailsDto } from './schema/create-educational-details.dto';
import { EducationalDetails } from './schema/education.schema';

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
}
