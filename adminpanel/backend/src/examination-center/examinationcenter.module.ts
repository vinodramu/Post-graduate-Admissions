import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExamCenter,ExamCenterSchema } from '../models/examCenter.entity';
import { ExaminationCenterService } from './examinationcenter.service';
import { ExaminationCenterController } from './examinationCenter.controller';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: ExamCenter.name, schema: ExamCenterSchema }]),
    ],
    providers: [ExaminationCenterService],
    controllers: [ExaminationCenterController],
})
export class ExaminationCenterModule { }
