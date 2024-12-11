/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './course.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectModel('Course') private readonly courseModel: Model<Course>, 
        // @InjectModel('College') private readonly collegeModel: Model<College> 
    ) { }

    async create(course: Course): Promise<Course> {
        const newCourse = new this.courseModel(course);
        return newCourse.save();
    }

    async findAll(): Promise<Course[]> {
        return this.courseModel.find();
    }

    // async findAllCoursesAssociatedToCollegeID(collegeId: string, page: number = 1, limit: number = 10): Promise<Course[]> {
    //     Logger.log('Start findAllCoursesAssociatedToCollegeID with pagination');
    //     const courseList: Course[] = [];
    //     const college : any = await this.collegeModel.findById(collegeId).populate({
    //         path: 'courses',
    //         options: {
    //             skip: (page - 1) * limit,
    //             limit: limit
    //         }
    //     }).exec();

    //     if (college && college.courses) {
    //         for (const courseId of college.courses) {
    //             const course = await this.courseModel.findById(courseId).exec();
    //             if (course) {
    //                 courseList.push(course);
    //             }
    //         }
    //     }
    //     return courseList;
    // }

    // async findAllCoursesAssociatedToCollegeByName(collegeName: string, page: number = 1, limit: number = 10): Promise<Course[]> {
    //     Logger.log('Start findAllCoursesAssociatedToCollegeByName with pagination');
    //     const courseList: Course[] = [];
    //     const college: any = await this.collegeModel.findOne({ name: collegeName }).populate({
    //         path: 'courses',
    //         options: {
    //             skip: (page - 1) * limit,
    //             limit: limit
    //         }
    //     }).exec();

    //     if (college && college.courses) {
    //         for (const courseId of college.courses) {
    //             const course = await this.courseModel.findById(courseId).exec();
    //             if (course) {
    //                 courseList.push(course);
    //             }
    //         }
    //     }
    //     return courseList;
    // }
    
    async getCourseIdByCourseName( courseName: string ): Promise<{courseId: string}> {
        Logger.log('Start getCourseIdByCourseName with pagination');
        return await this.courseModel.findOne({ name: courseName })
    }

    async findOne(id: string): Promise<Course> {
        return this.courseModel.findById(id).populate('students').exec();
    }

    async update(id: string, course: Course): Promise<Course> {
        return this.courseModel.findByIdAndUpdate(id, course, { new: true }).exec();
    }
}
