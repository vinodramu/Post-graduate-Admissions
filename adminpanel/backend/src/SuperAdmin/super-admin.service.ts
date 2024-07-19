import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperAdmin, SuperAdminDocument } from './super-admin.entity';
import { CreateSuperAdminDto } from '../dto/super-admin.dto';

@Injectable()
export class SuperAdminService {
    constructor(
        @InjectModel(SuperAdmin.name) private superAdminModel: Model<SuperAdminDocument>,
    ) { }

    async create(createSuperAdminDto: CreateSuperAdminDto): Promise<SuperAdmin> {
        const createdSuperAdmin = new this.superAdminModel(createSuperAdminDto);
        return createdSuperAdmin.save();
    }

    async findAll(): Promise<SuperAdmin[]> {
        return this.superAdminModel.find().exec();
    }

    // Add other necessary methods like findOne, update, delete etc.
}
