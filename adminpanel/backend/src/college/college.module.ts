import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CollegeController } from 'src/college/college.controller'; // Import the CollegeController
import { CollegeService } from 'src/college/college.service'; // Import the CollegeService
import { CollegeSchema } from 'src/models/college.entity'; // Import the CollegeSchema

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'College', schema: CollegeSchema }])
    ],
    providers: [CollegeService],
    controllers: [CollegeController],
})
export class CollegeModule { }
