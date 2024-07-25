// education.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Education, EducationSchema } from './schema/education.schema';
import { EducationService } from './education.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Education.name, schema: EducationSchema }]),
  ],
  providers: [EducationService],
  exports: [EducationService],
})
export class EducationModule {}
