import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { College } from '../models/college.entity'; // Import the College entity

@Injectable()
export class CollegeService {
    constructor(
        @InjectModel('College') private readonly collegeModel: Model<College>
    ) { }

    async create(college: College): Promise<College> {
        const newCollege = new this.collegeModel(college);
        return newCollege.save();
    }

    async findAll(page: number = 1, limit: number = 10): Promise<College[]> {
        return this.collegeModel.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('courses')
            .exec();
    }

    async findOne(id: string): Promise<College> {
        return this.collegeModel.findById(id).populate('courses').exec();
    }

    async update(id: string, college: College): Promise<College> {
        return this.collegeModel.findByIdAndUpdate(id, college, { new: true }).exec();
    }

    // async remove(id: string): Promise<College> {
    //     return this.collegeModel.findByIdAndRemove(id).exec();
    // }
}
