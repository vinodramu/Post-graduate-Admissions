import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema'; // Adjust the import path as necessary

@Injectable()
export class CourseService implements OnModuleInit {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async onModuleInit() {
    const count = await this.courseModel.countDocuments();
    if (count === 0) {
      await this.createDemoCourses();
    }
  }

  async createDemoCourses(): Promise<void> {
    const demoCoursesData = [
      {
        course_id: 'CS101',
        course_name: 'Introduction to Computer Science',
        description: 'This course provides an introduction to computer science concepts, including programming, algorithms, and data structures.',
        fee_structure: 5000,
      },
      {
        course_id: 'CS201',
        course_name: 'Data Structures and Algorithms',
        description: 'Advanced topics in data structures and algorithms, including sorting, searching, and graph algorithms.',
        fee_structure: 7000,
      },
      {
        course_id: 'CS301',
        course_name: 'Database Systems',
        description: 'Introduction to database design, SQL, and database management systems.',
        fee_structure: 6000,
      },
      {
        course_id: 'CS401',
        course_name: 'Operating Systems',
        description: 'Study of operating system principles, including process management, memory management, and file systems.',
        fee_structure: 6500,
      },
      {
        course_id: 'CS501',
        course_name: 'Computer Networks',
        description: 'Introduction to computer networking concepts, including network protocols, architecture, and security.',
        fee_structure: 7000,
      },
      {
        course_id: 'CS601',
        course_name: 'Software Engineering',
        description: 'Principles of software engineering, including software development life cycle, design patterns, and testing.',
        fee_structure: 6800,
      },
      {
        course_id: 'CS701',
        course_name: 'Artificial Intelligence',
        description: 'Introduction to artificial intelligence concepts, including machine learning, neural networks, and natural language processing.',
        fee_structure: 7500,
      },
      {
        course_id: 'CS801',
        course_name: 'Web Development',
        description: 'Comprehensive study of web development technologies, including HTML, CSS, JavaScript, and modern frameworks.',
        fee_structure: 6200,
      },
      {
        course_id: 'CS901',
        course_name: 'Mobile App Development',
        description: 'Introduction to mobile application development, focusing on both iOS and Android platforms.',
        fee_structure: 7300,
      },
      {
        course_id: 'CS1001',
        course_name: 'Cloud Computing',
        description: 'Study of cloud computing principles, including virtualization, cloud architecture, and cloud services.',
        fee_structure: 8000,
      },
    ];

    await this.courseModel.insertMany(demoCoursesData);
  }
}
