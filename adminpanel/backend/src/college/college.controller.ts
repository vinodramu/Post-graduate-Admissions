import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { CollegeService } from './college.service'; // Import the CollegeService
import { College } from '../models/college.entity'; // Import the College entity

@Controller('college')
export class CollegeController {
    constructor(private readonly collegeService: CollegeService) { }

    @Post()
    async create(@Body() college: College) {
        return this.collegeService.create(college);
    }

    @Get('get/colleges')
    async findAll(
        @Query('page') page: number = 1,  // Add pagination parameters
        @Query('limit') limit: number = 10
    ): Promise<College[]> {
        return this.collegeService.findAll(page, limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.collegeService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() college: College) {
        return this.collegeService.update(id, college);
    }

    // @Delete(':id')
    // async remove(@Param('id') id: string) {
    //     return this.collegeService.remove(id);
    // }
}
