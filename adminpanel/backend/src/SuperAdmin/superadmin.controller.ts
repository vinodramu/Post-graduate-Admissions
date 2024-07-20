import { Controller, Get, Post, Body, UnauthorizedException } from '@nestjs/common';
import { SuperAdminService } from './superadmin.service';
import { CreateSuperAdminDto } from '../dto/super-admin.dto';
import { LoginSuperAdminDto } from 'src/dto/login-super-admin.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('superAdmin')
export class SuperAdminController {
    constructor(
        private readonly superAdminService: SuperAdminService,
        private readonly authService: AuthService
    ) { }

    @Post('/create')
    async create(@Body() createSuperAdminDto: CreateSuperAdminDto) {
        return this.superAdminService.create(createSuperAdminDto);
    }

    @Post('/login')
    async login(@Body() credentials: LoginSuperAdminDto) {
        const user = await this.authService.validateUser(credentials.username, credentials.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user); 
    }

    @Get()
    async findAll() {
        return this.superAdminService.findAll();
    }

    // Add other necessary endpoints like findOne, update, delete etc.
}
