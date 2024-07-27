// personal-details.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PersonalDetails,
  PersonalDetailsSchema,
} from './schemas/personalDetails.schema';
import { PersonalDetailsController } from './personalDetails.controller';
import { PersonalDetailsService } from './personalDetails.service';
import { Address, AddressSchema } from 'src/Address/schemas/address.schema';
import {
  EducationalDetails,
  EducationalDetailsSchema,
} from 'src/education/schema/education.schema';
import {
  DocumentEntity,
  DocumentSchema,
} from 'src/document/schemas/document.schema';
import {
  Application,
  ApplicationSchema,
} from 'src/application/schemas/application.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PersonalDetails.name, schema: PersonalDetailsSchema },
      { name: Address.name, schema: AddressSchema },
      { name: EducationalDetails.name, schema: EducationalDetailsSchema },
      { name: DocumentEntity.name, schema: DocumentSchema },
      { name: Application.name, schema: ApplicationSchema },
    ]),
  ],
  controllers: [PersonalDetailsController],
  providers: [PersonalDetailsService],
})
export class PersonalDetailsModule {}
