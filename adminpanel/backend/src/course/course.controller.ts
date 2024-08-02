import { Controller, Get, Post, Body, Put, Param, Query } from '@nestjs/common';
import {Course}  from '../models/course.entity';
import { CourseService } from 'src/course/course.service';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Post()
    async create(@Body() course:  Course) {
        return this.courseService.create(course);
    }

    @Get()
    async findAll(): Promise< Course[]> {
        return this.courseService.findAll();
    }

    @Get('get/courses/:id')
    async findCoursesAssociatedToCollegeID(
        @Param('id') collegeId: string,
        @Query('page') page: number = 1,  
        @Query('limit') limit: number = 10
    ): Promise<Course[]> {
        return this.courseService.findAllCoursesAssociatedToCollegeID(collegeId, page, limit);
    }

    @Get('get/:name')
    async findCoursesAssociatedToCollegeByName(
        @Param('name') collegeName: string,
        @Query('page') page: number = 1,  
        @Query('limit') limit: number = 10
    ): Promise<Course[]> {
        return await this.courseService.findAllCoursesAssociatedToCollegeByName(collegeName, page, limit);
    }

    @Get('get/courseId/:name')
    async getCourseIdByCourseName(
        @Param('name') courseName: string
    ): Promise<{courseId: string}> {
        return await this.courseService.getCourseIdByCourseName(courseName);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise< Course> {
        return this.courseService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() course:  Course): Promise< Course> {
        return this.courseService.update(id, course);
    }
}
