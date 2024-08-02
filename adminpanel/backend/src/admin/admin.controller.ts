import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    Query,
    UsePipes,
    ValidationPipe,
    NotFoundException,
    BadRequestException
} from '@nestjs/common';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { AdminService } from './admin.service';
import { Admin } from 'src/models/admin.schema';



@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('create')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
        try {
            return await this.adminService.create(createAdminDto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<{ data: Admin[], total: number, totalPages: number }> {
        try {
            return await this.adminService.findAll(page, limit);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get()
    async getAllStudents(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<{ data: unknown[], total: number, totalPages: number }> {
        try {
            return await this.adminService.getStudents(page, limit);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Admin> {
        try {
            const admin = await this.adminService.findOne(id);
            if (!admin) {
                throw new NotFoundException(`Admin with ID ${id} not found`);
            }
            return admin;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto): Promise<Admin> {
        try {
            const updatedAdmin = await this.adminService.update(id, updateAdminDto);
            if (!updatedAdmin) {
                throw new NotFoundException(`Admin with ID ${id} not found`);
            }
            return updatedAdmin;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        try {
               await this.adminService.remove(id);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
