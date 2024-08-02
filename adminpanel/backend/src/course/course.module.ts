import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from 'src/course/course.controller';
import { CollegeSchema } from 'src/models/college.entity';
import { CourseSchema } from 'src/models/course.entity';
import { CourseService } from 'src/course/course.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Course', schema: CourseSchema }, // Changed name to 'Course'
            { name: 'College', schema: CollegeSchema } // Changed name to 'College'
        ])
    ],
    providers: [CourseService],
    controllers: [CourseController]
})
export class CourseModule { }
