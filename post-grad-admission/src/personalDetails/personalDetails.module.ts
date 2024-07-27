// personal-details.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalDetails, PersonalDetailsSchema } from './schemas/personalDetails.schema';
import { PersonalDetailsController } from './personalDetails.controller';
import { PersonalDetailsService } from './personalDetails.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PersonalDetails.name, schema: PersonalDetailsSchema }])
  ],
  controllers: [PersonalDetailsController],
  providers: [PersonalDetailsService],
})
export class PersonalDetailsModule {}
