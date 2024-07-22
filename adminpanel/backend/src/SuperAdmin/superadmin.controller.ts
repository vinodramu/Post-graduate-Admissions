import { Controller, Get, Post, Body, Logger, forwardRef, HttpStatus, Inject, Query } from '@nestjs/common';
import { SuperAdminService } from './superadmin.service';
import { CreateSuperAdminDto } from '../dto/super-admin.dto';
import { LoginSuperAdminDto } from 'src/dto/login-super-admin.dto';
import { AuthService } from '../auth/auth.service';
import { Student } from './student.entity';
import { CreateStudentDto } from 'src/dto/create-student.dto';

@Controller('superAdmin')
export class SuperAdminController {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        @Inject(forwardRef(() => SuperAdminService))
        private readonly superAdminService: SuperAdminService
    ) { }

    @Post('/create')
    async create(@Body() createSuperAdminDto: CreateSuperAdminDto) {
        return this.superAdminService.create(createSuperAdminDto);
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

    @Get('/list/students')
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
    
    @Post('/create/student')
    async createStudent(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
        return this.superAdminService.createStudent(createStudentDto);
    }   
    
    @Get()
    async findAll() {
        return this.superAdminService.findAll();
    }
}
