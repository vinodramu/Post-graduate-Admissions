import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { CourseSchema } from './course.entity';
import { CourseService } from './course.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Course', schema: CourseSchema }, // Changed name to 'Course'
        ])
    ],
    providers: [CourseService],
    controllers: [CourseController]
})
export class CourseModule { }
