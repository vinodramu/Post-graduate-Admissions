import { Controller, Get, Post, Body, Logger, forwardRef, HttpStatus, Inject, Query } from '@nestjs/common';
import { SuperAdminService } from '../services/superadmin.service';
import { CreateSuperAdminDto } from '../dto/super-admin.dto';
import { LoginSuperAdminDto } from 'src/dto/login-super-admin.dto';
import { AuthService } from '../services/auth.service';
import { Student } from '../models/student.entity';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { AdminService } from 'src/services/admin.service';
import { CreateAdminDto } from 'src/dto/create-admin.dto';
import { Admin } from 'src/models/admin.schema';

@Controller('superAdmin')
export class SuperAdminController {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        @Inject(forwardRef(() => SuperAdminService))
        private readonly superAdminService: SuperAdminService,
        @Inject(forwardRef(() => AdminService))
        private readonly adminService: AdminService
    ) { }

    @Post('create/superadmin')
    async createSuperAdmin(@Body() createSuperAdminDto: CreateSuperAdminDto) {
        return this.superAdminService.create(createSuperAdminDto);
    }

    @Post('create/admin')
    async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
        return await this.adminService.create(createAdminDto);
    }

    @Post('login')
    public async getAccessTokenIfUserAuthorized(@Body() credentials: LoginSuperAdminDto): Promise<{ access_token: string }> {
        Logger.log(`Start AuthController : getAccessTokenIfUserAuthorized`)
        try {
            const userAuthorized = await this.authService.validateUserIsAuthorized(credentials);
            if (!userAuthorized) {
                throw new Error('Invalid credentials');
            }
            return this.authService.login(userAuthorized);
        }
        catch (err) {
            Logger.log(`Error in AuthController : getAccessTokenIfUserAuthorized`)
            HttpStatus.UNAUTHORIZED
        }
    }

    @Get('list/students')
    async findAllStudents(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 4,
    ) {
        const { students, total } = await this.superAdminService.findAllStudents(page, limit);
        return {
            students,
            total,
            page,
            limit,
        };
    }
    
    @Post('create/student')
    async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
        return this.superAdminService.createStudent(createStudentDto);
    }   
    
    @Get()
    async findAll() {
        return this.superAdminService.findAll();
    }
}
