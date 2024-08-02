/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from '../models/admin.schema';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminService {
    private readonly saltRounds = 10; 
    private readonly logger = new Logger(AdminService.name); 

    constructor(
        @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    ) { }

    async create(createAdminDto: CreateAdminDto): Promise<Admin> {
        this.logger.log(`Started create method with parameters: ${JSON.stringify(createAdminDto)}`);

        const { password } = createAdminDto;
        if (!password) {
            this.logger.error('Password is required');
            throw new BadRequestException('Password is required');
        }

        const hashedPassword = await bcrypt.hash(password, this.saltRounds);

        const createdAdmin = new this.adminModel({
            ...createAdminDto,
            password: hashedPassword,
        });

        const result = await createdAdmin.save();
        this.logger.log(`Admin created with ID: ${result._id}`);
        return result;
    }

    async findAll(page: number = 1, limit: number = 4): Promise<{ data: Admin[], total: number, totalPages: number }> {
        this.logger.log(`Started findAll method with page: ${page}, limit: ${limit}`);

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.adminModel.find().skip(skip).limit(limit).exec(),
            this.adminModel.countDocuments().exec(),
        ]);

        const totalPages = Math.ceil(total / limit); // Calculate total pages

        this.logger.log(`Found ${total} admins, total pages: ${totalPages}`);
        return { data, total, totalPages };
    }

    async getStudents(page: number = 1, limit: number = 10): Promise<{ data: any[], total: number, totalPages: number }> {
        this.logger.log(`Started getStudents method with page: ${page}, limit: ${limit}`);

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.studentModel.find().skip(skip).limit(limit).exec(),
            this.adminModel.countDocuments().exec(),
        ]);

        const totalPages = Math.ceil(total / limit); // Calculate total pages

        this.logger.log(`Found ${total} admins, total pages: ${totalPages}`);
        return { data, total, totalPages };
    }

    async findOne(id: string): Promise<Admin> {
        this.logger.log(`Started findOne method with ID: ${id}`);

        const admin = await this.adminModel.findById(id).exec();
        if (!admin) {
            this.logger.error(`Admin with ID ${id} not found`);
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }

        this.logger.log(`Found admin with ID: ${id}`);
        return admin;
    }

    async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
        this.logger.log(`Started update method with ID: ${id} and parameters: ${JSON.stringify(updateAdminDto)}`);
        const updatedAdmin = await this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true }).exec();
        if (!updatedAdmin) {
            this.logger.error(`Admin with ID ${id} not found`);
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }

        this.logger.log(`Updated admin with ID: ${id}`);
        return updatedAdmin;
    }

    async remove(id: string): Promise<void> {
        this.logger.log(`Started remove method with ID: ${id}`);

        const result = await this.adminModel.findByIdAndDelete(id).exec();
        if (!result) {
            this.logger.error(`Admin with ID ${id} not found`);
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }

        this.logger.log(`Deleted admin with ID: ${id}`);
    }
}
