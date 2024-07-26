import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './schemas/application.schema';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { StudentService } from 'src/student/student.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Application.name, schema: ApplicationSchema },
    ]),
  ],
  providers: [ApplicationService, StudentService],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
