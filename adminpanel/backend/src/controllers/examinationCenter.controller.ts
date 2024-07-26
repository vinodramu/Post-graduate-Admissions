import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ExaminationCenterService } from '../services/examinationcenter.service';
import { CreateExaminationCenterDto } from '../dto/create-examination-center.dto';
import { UpdateExaminationCenterDto } from '../dto/update-examinationcenter.dto';
import { ExaminationCenter } from '../models/examination-center.schema';

@Controller('examinationcenter')
export class ExaminationCenterController {
    constructor(private readonly examinationCenterService: ExaminationCenterService) { }

    @Post('create')
    async create(@Body() createExaminationCenterDto: CreateExaminationCenterDto): Promise<ExaminationCenter> {
        return this.examinationCenterService.create(createExaminationCenterDto);
    }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 4
    ): Promise<{ data: ExaminationCenter[], total: number, totalPages: number }> {
        return this.examinationCenterService.findAll(page, limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ExaminationCenter> {
        return this.examinationCenterService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateExaminationCenterDto: UpdateExaminationCenterDto): Promise<ExaminationCenter> {
        return this.examinationCenterService.update(id, updateExaminationCenterDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.examinationCenterService.remove(id);
    }
}
