import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperAdmin, SuperAdminDocument } from './superadmin.entity';
import { CreateSuperAdminDto } from '../dto/super-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SuperAdminService {
    constructor(
        @InjectModel(SuperAdmin.name) private superAdminModel: Model<SuperAdminDocument>,
    ) { }

    async create(createSuperAdminDto: CreateSuperAdminDto): Promise<SuperAdmin> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createSuperAdminDto.password, saltRounds);

        const createdSuperAdmin = new this.superAdminModel({
            ...createSuperAdminDto,
            password: hashedPassword,
        });

        return createdSuperAdmin.save();
    }

    async findAll(): Promise<SuperAdmin[]> {
        return this.superAdminModel.find().exec();
    }

    // Add other necessary methods like findOne, update, delete etc.
}
