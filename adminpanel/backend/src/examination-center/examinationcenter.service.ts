import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateExaminationCenterDto } from '../dto/update-examinationCenter.dto';
import { ExamCenter }  from '../models/examCenter.entity';

@Injectable()
export class ExaminationCenterService {
    private readonly logger = new Logger(ExaminationCenterService.name);

    constructor(@InjectModel(ExamCenter.name) private readonly examinationCenterModel: Model<ExamCenter>) { }

    // Create a new examination center
    async create(createExaminationCenterDto: ExamCenter): Promise<unknown | ExamCenter> {
        this.logger.log(`Started create method with data: ${JSON.stringify(createExaminationCenterDto)}`);

        const createdExaminationCenter = new this.examinationCenterModel(createExaminationCenterDto);
        const result = await createdExaminationCenter.save();

        this.logger.log(`Created examination center with ID: ${result.id}`);
        return result;
    }

    // Find all examination centers with pagination
    async findAll(page: number = 1, limit: number = 4): Promise<{ data: ExamCenter[] | unknown[], total: number, totalPages: number }> {
        this.logger.log(`Started findAll method with page: ${page} and limit: ${limit}`);

        if (page < 1 || limit < 1) {
            throw new BadRequestException('Page and limit must be greater than 0');
        }

        const skip = (page - 1) * limit;
        this.logger.log(`Skipping ${skip} records`);

        const [data, total] = await Promise.all([
            this.examinationCenterModel.find().skip(skip).limit(limit).exec(),
            this.examinationCenterModel.countDocuments().exec(),
        ]);

        const totalPages = Math.ceil(total / limit); // Calculate total pages
        this.logger.log(`Found ${data.length} examination centers, Total count: ${total}, Total pages: ${totalPages}`);

        return { data, total, totalPages };
    }

    // Find an examination center by ID
    async findOne(id: string): Promise<ExamCenter | unknown> {
        this.logger.log(`Started findOne method with ID: ${id}`);

        const examinationCenter = await this.examinationCenterModel.findById(id).exec();
        if (!examinationCenter) {
            this.logger.error(`Examination center with ID ${id} not found`);
            throw new NotFoundException(`Examination center with ID ${id} not found`);
        }

        this.logger.log(`Found examination center with ID: ${id}`);
        return examinationCenter;
    }

    // Update an examination center by ID
    async update(id: string, updateExaminationCenterDto: UpdateExaminationCenterDto): Promise<ExamCenter | unknown> {
        this.logger.log(`Started update method with ID: ${id} and data: ${JSON.stringify(updateExaminationCenterDto)}`);

        const updatedExaminationCenter = await this.examinationCenterModel.findByIdAndUpdate(id, updateExaminationCenterDto, { new: true }).exec();
        if (!updatedExaminationCenter) {
            this.logger.error(`Examination center with ID ${id} not found`);
            throw new NotFoundException(`Examination center with ID ${id} not found`);
        }

        this.logger.log(`Updated examination center with ID: ${id}`);
        return updatedExaminationCenter;
    }

    // Delete an examination center by ID
    async remove(id: string): Promise<void> {
        this.logger.log(`Started remove method with ID: ${id}`);

        const result = await this.examinationCenterModel.findByIdAndDelete(id).exec();
        if (!result) {
            this.logger.error(`Examination center with ID ${id} not found`);
            throw new NotFoundException(`Examination center with ID ${id} not found`);
        }

        this.logger.log(`Deleted examination center with ID: ${id}`);
    }
}
