import { Controller, Get, Post, Body, Logger, forwardRef, HttpStatus, Inject } from '@nestjs/common';
import { SuperAdminService } from './superadmin.service';
import { CreateSuperAdminDto } from '../dto/super-admin.dto';
import { LoginSuperAdminDto } from 'src/dto/login-super-admin.dto';
import { AuthService } from '../auth/auth.service';

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

    @Get()
    async findAll() {
        return this.superAdminService.findAll();
    }
}
