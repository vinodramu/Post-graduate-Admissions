import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthService } from 'src/auth/auth.service';

export interface Credentials{
    email : string,
    password: string
}


@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private readonly authService: AuthService,
    ) { }

    @Get('students')
    async getAllStudents(): Promise<unknown>{
        try {
            return await this.adminService.findAll();
        } catch (error) {
            throw error;
        }
    }

    // @Get()
    // async findAll() {
    //     try {
    //         return await this.adminService.findAll();
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // @Get(':id')
    // async findOne(@Param('id') id: string) {
    //     try {
    //         return await this.adminService.findOne(id);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // @Put(':id')
    // async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    //     try {
    //         return await this.adminService.update(id, updateAdminDto);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // @Delete(':id')
    // async remove(@Param('id') id: string) {
    //     try {
    //         return await this.adminService.remove(id);
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}
