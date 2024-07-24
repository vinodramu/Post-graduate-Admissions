// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Course } from './schemas/course.schema'; // Adjust the import path as necessary

// @Injectable()
// export class CourseService {
//   constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

//   async createDemoCourse(): Promise<Course> {
//     const demoCourseData = {
//       course_id: 'CS101',
//       course_name: 'Introduction to Computer Science',
//       description: 'This course provides an introduction to computer science concepts, including programming, algorithms, and data structures.',
//       fee_structure: 5000,
//     };

//     const createdCourse = new this.courseModel(demoCourseData);
//     return createdCourse.save();
//   }
// }
