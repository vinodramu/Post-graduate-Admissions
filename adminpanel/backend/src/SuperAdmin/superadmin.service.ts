import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperAdmin, SuperAdminDocument } from './superadmin.entity';
import { CreateSuperAdminDto } from '../dto/super-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SuperAdminService {
    generatedIds: Set<string>;
    constructor(
        @InjectModel(SuperAdmin.name) private superAdminModel: Model<SuperAdminDocument>,
    ) { this.generatedIds = new Set();  }

    async create(createSuperAdminDto: CreateSuperAdminDto): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createSuperAdminDto.password, saltRounds);

        const createdSuperAdmin = new this.superAdminModel({
            ...createSuperAdminDto,
            password: hashedPassword,
            adminId: this.generateId()
        });

        const admin = await createdSuperAdmin.save();
        if (admin) return admin.adminId;
    }

    async findAll(): Promise<SuperAdmin[]> {
        return this.superAdminModel.find().exec();
    }

    generateId() {
        let id: string;
        do {
            id = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
        } while (this.generatedIds.has(id));
        this.generatedIds.add(id);
        return id;
    }

    // Add other necessary methods like findOne, update, delete etc.
}
