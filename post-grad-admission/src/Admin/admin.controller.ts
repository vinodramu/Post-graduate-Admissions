import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthService } from 'src/auth/auth.service';
import { StudentsResponseDto } from './dto/students-response.dto';

export interface Credentials {
  email: string;
  password: string;
}

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService
  ) {}

  @Get('students')
  async getAllStudents(): Promise<StudentsResponseDto | unknown> {
    const students = await this.adminService.findAll();
    if (!students) {
      return 'No Student Found';
    } else return students;
  }
}
