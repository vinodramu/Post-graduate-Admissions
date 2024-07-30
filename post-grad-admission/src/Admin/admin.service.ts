import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Address } from 'src/Address/schemas/address.schema';
import { Application } from 'src/application/schemas/application.schema';
import { Course } from 'src/courses/course.entity';
import { DocumentEntity } from 'src/document/schemas/document.schema';
import { EducationalDetails } from 'src/education/schema/education.schema';
import { PersonalDetails } from 'src/personalDetails/schemas/personalDetails.schema';
import { User } from 'src/user/user.entity';
import { GridFSBucket } from 'mongodb';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);
  private gridFSBucket: GridFSBucket;
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(DocumentEntity.name)
    private readonly documentModel: Model<DocumentEntity>,
    @InjectModel(PersonalDetails.name)
    private readonly personalDetailsModel: Model<PersonalDetails>,
    @InjectModel(Application.name)
    private readonly applicationModel: Model<Application>,
    @InjectModel(Address.name)
    private readonly addressModel: Model<Address>,
    @InjectModel(EducationalDetails.name)
    private readonly educationalDetailsModel: Model<EducationalDetails>,
    @InjectModel(Course.name)
    private readonly courseModel: Model<Course>
  ) {}

  private async getGridFSFileById(fileId: Types.ObjectId) {
    return new Promise((resolve, reject) => {
      let data = Buffer.from([]);
      this.gridFSBucket
        .openDownloadStream(fileId)
        .on('data', (chunk) => {
          data = Buffer.concat([data, chunk]);
        })
        .on('error', (err) => {
          reject(err);
        })
        .on('end', () => {
          resolve(data);
        });
    });
  }

  async findAll() {
    this.logger.log('Start: AdminService: findAll');

    const users = await this.userModel.find().exec();
    this.logger.log(
      `Fetched users: ${JSON.stringify(users.map((user) => user._id))}`
    );

    const studentsDetails = await Promise.all(
      users
        .filter((user) => user.role === 'student')
        .map(async (user: any) => {
          this.logger.log(`Fetching details for student: ${user._id}`);
          const personalDetails = await this.personalDetailsModel.findOne({
            email: user.email,
          });
          const id = personalDetails._id;
          this.logger.log(
            `personal details ${personalDetails}, ${personalDetails._id}`
          );
          const address: any = (await this.addressModel.find().exec()).filter(
            (address) => address.studentId == id
          );
          this.logger.log(`address details ${address}, ${personalDetails._id}`);
          const applications: any = (
            await this.applicationModel.find().exec()
          ).filter((application) => application.studentId == id);
          const education: any = (
            await this.educationalDetailsModel.find().exec()
          ).filter((education) => education.studentId == id);
          const documents: any = (
            await this.documentModel.find().exec()
          ).filter((document) => document.studentId == id);
          const studentDetails = {
            ...personalDetails.toObject(),
            address,
            applications,
            education,
            documents,
          };
          return studentDetails;
        })
    );
    return studentsDetails;
  }
}