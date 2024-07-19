import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { CreateSuperAdminDto } from '../dto/super-admin.dto';

@Controller('super-admin')
export class SuperAdminController {
    constructor(private readonly superAdminService: SuperAdminService) { }

    @Post()
    async create(@Body() createSuperAdminDto: CreateSuperAdminDto) {
        return this.superAdminService.create(createSuperAdminDto);
    }

    @Get()
    async findAll() {
        return this.superAdminService.findAll();
    }

    // Add other necessary endpoints like findOne, update, delete etc.
}
