import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthService } from 'src/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/user.entity';
import { Address, AddressSchema } from 'src/Address/schemas/address.schema';
import { ApplicationsDetails, ApplicationsDetailsSchema } from 'src/application/schemas/application.schema';
import { Course, CourseSchema } from 'src/courses/course.entity';
import {
  DocumentEntity,
  DocumentSchema,
} from 'src/document/schemas/document.schema';
import {
  Education,
  EducationalDetails,
  EducationalDetailsSchema,
  EducationSchema,
} from 'src/education/schema/education.schema';
import {
  PersonalDetails,
  PersonalDetailsSchema,
} from 'src/personalDetails/schemas/personalDetails.schema';
import { ApplicationService } from 'src/application/application.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: DocumentEntity.name, schema: DocumentSchema },
      { name: PersonalDetails.name, schema: PersonalDetailsSchema },
      { name: ApplicationsDetails.name, schema: ApplicationsDetailsSchema },
      { name: Address.name, schema: AddressSchema },
      { name: Education.name, schema: EducationSchema },
      { name: Course.name, schema: CourseSchema },
      { name: EducationalDetails.name, schema: EducationalDetailsSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AuthService, ApplicationService],
})
export class AdminModule {}
