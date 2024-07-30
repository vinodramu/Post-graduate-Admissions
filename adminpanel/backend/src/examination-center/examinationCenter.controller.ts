import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ExaminationCenterService } from './examinationcenter.service';
import { UpdateExaminationCenterDto } from '../dto/update-examinationcenter.dto';
import { ExamCenter } from '../models/examCenter.entity';

@Controller('examinationcenter')
export class ExaminationCenterController {
    constructor(private readonly examinationCenterService: ExaminationCenterService) { }

    @Post('create')
    async create(@Body() createExaminationCenter: ExamCenter): Promise<ExamCenter | unknown> {
        return this.examinationCenterService.create(createExaminationCenter);
    }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 4
    ): Promise<{ data: ExamCenter[] | unknown[], total: number, totalPages: number }> {
        return this.examinationCenterService.findAll(page, limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ExamCenter | unknown> {
        return this.examinationCenterService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateExaminationCenterDto: UpdateExaminationCenterDto): Promise<ExamCenter | unknown> {
        return this.examinationCenterService.update(id, updateExaminationCenterDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.examinationCenterService.remove(id);
    }
}
