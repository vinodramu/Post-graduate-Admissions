import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExaminationCenter, ExaminationCenterSchema } from '../models/examination-center.schema';
import { ExaminationCenterService } from '../services/examinationcenter.service';
import { ExaminationCenterController } from '../controllers/examinationCenter.controller';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: ExaminationCenter.name, schema: ExaminationCenterSchema }]),
    ],
    providers: [ExaminationCenterService],
    controllers: [ExaminationCenterController],
})
export class ExaminationCenterModule { }
