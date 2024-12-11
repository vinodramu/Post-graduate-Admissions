import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { Admin } from '../models/admin.schema';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('create')
    async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
        return await this.adminService.create(createAdminDto);
    }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 4
    ): Promise<{ data: Admin[], total: number, totalPages: number }> {
        return this.adminService.findAll(page, limit);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Admin> {
        return this.adminService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto): Promise<Admin> {
        return this.adminService.update(id, updateAdminDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.adminService.remove(id);
    }
}
