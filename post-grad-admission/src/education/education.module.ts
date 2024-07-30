// educational-details.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationalDetailsController } from './education.controller';
import { EducationalDetailsService } from './education.service';
import {
  EducationalDetails,
  EducationalDetailsSchema,
} from './schema/education.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EducationalDetails.name, schema: EducationalDetailsSchema },
    ]),
  ],
  controllers: [EducationalDetailsController],
  providers: [EducationalDetailsService],
})
export class EducationalDetailsModule {}
