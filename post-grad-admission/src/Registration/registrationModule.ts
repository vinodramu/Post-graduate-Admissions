import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PersonalDetails,
  PersonalDetailsSchema,
} from 'src/personalDetails/schemas/personalDetails.schema';
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
import { Student, StudentSchema } from 'src/student/schemas/student.schema';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { GridFSService } from 'src/file-upload/gridFS.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Student.name, schema: StudentSchema },
      { name: PersonalDetails.name, schema: PersonalDetailsSchema },
      { name: Address.name, schema: AddressSchema },
      { name: EducationalDetails.name, schema: EducationalDetailsSchema },
      { name: DocumentEntity.name, schema: DocumentSchema },
      { name: Application.name, schema: ApplicationSchema },
    ]),
  ],
  providers: [RegistrationService, GridFSService],
  controllers: [RegistrationController],
})
export class RegistrationModule {}
