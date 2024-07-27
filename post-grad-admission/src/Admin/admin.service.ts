import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, Types } from 'mongoose';
import { Address } from 'src/Address/schemas/address.schema';
import { Application } from 'src/application/schemas/application.schema';
import { Course } from 'src/courses/course.entity';
import { DocumentEntity } from 'src/document/schemas/document.schema';
import { Education, EducationalDetails } from 'src/education/schema/education.schema';
import { PersonalDetails } from 'src/personalDetails/schemas/personalDetails.schema';
import { User } from 'src/user/user.entity';
import { GridFSBucket } from 'mongodb';
import { ApplicationController } from './../application/application.controller';
import { ApplicationService } from 'src/application/application.service';


@Injectable()
export class AdminService {
    private readonly logger = new Logger(AdminService.name);
    private gridFSBucket: GridFSBucket;
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(DocumentEntity.name) private readonly documentModel: Model<DocumentEntity>,
        @InjectModel(PersonalDetails.name) private readonly personalDetailsModel: Model<PersonalDetails>,
        @InjectModel(Application.name) private readonly applicationModel: Model<Application>,
        @InjectModel(Address.name) private readonly addressModel: Model<Address>,
        @InjectModel(EducationalDetails.name) private readonly educationalDetailsModel: Model<EducationalDetails>,
        @InjectModel(Course.name) private readonly courseModel: Model<Course>,
        @InjectConnection() private readonly connection: Connection,
        private readonly applicationService: ApplicationService
    ) {
        const db = this.connection.db as any;
        this.gridFSBucket = new GridFSBucket(db, {
            bucketName: 'fs',
        });
    }

    private async getGridFSFiles(documentIds: Types.ObjectId[]) {
        this.logger.log(`Start: AdminService: getGridFSFiles: documentIds: ${JSON.stringify(documentIds)}`);
        const files = await this.gridFSBucket.find({ _id: { $in: documentIds } }).toArray();
        this.logger.log(`End: AdminService: getGridFSFiles: result: ${JSON.stringify(files)}`);
        return files;
    }

    async findAll() {
        this.logger.log('Start: AdminService: findAll');

        // Fetch all users
        const users = await this.userModel.find().exec();
        this.logger.log(`Fetched users: ${JSON.stringify(users.map(user => user._id))}`);

        // Filter students and fetch their details
        const studentsDetails = await Promise.all(
            users
                .filter(user => user.role === 'student')
                .map(async (user: any) => {
                    this.logger.log(`Fetching details for student: ${user._id}`);
                    const personalDetails = await (await this.personalDetailsModel.findOne({email: user.email})).populate('')
                    const id = personalDetails._id

        //             this.logger.log(`personal details ${personalDetails}, ${personalDetails._id}`);
                    // const address: any = await this.addressModel.find().exec()
                    // const addressDetails = address.map((address)=>{if(address._id===id){ return address}})
                    
        //             const applicationDetails: any = await this.applicationModel.find({studentId: personalDetails._id}).populate('Course').exec()  
        const studentDetails = {
            ...personalDetails.toObject(),
            // addressDetails,
           
        //     applicationDetails
                    };
                    return studentDetails;
                })) 
                return studentsDetails;
                }          
            }

