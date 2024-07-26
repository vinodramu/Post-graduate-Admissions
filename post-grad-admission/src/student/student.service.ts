import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './schemas/student.schema';
import { Application } from 'src/application/schemas/application.schema';
import { PersonalDetails } from 'src/personalDetails/schemas/personalDetails.schema';
import { Address } from 'src/Address/schemas/address.schema';
import { EducationalDetails } from 'src/education/schema/education.schema';
import { DocumentEntity } from 'src/document/schemas/document.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
    @InjectModel(PersonalDetails.name)
    private personalDetailsModel: Model<PersonalDetails>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
    @InjectModel(EducationalDetails.name)
    private educationalDetailsModel: Model<EducationalDetails>,
    @InjectModel(DocumentEntity.name)
    private documentModel: Model<DocumentEntity>,
    @InjectModel(Application.name) private applicationModel: Model<Application>
  ) {}

  // async createStudentWithApplication(
  //   studentJson: Student,
  //   applicationDataJson:  Partial<Application>[],

  //   files: { [key: string]: Express.Multer.File },
  // ): Promise<any> {
  //   try {
  //     const createdStudent = new this.studentModel(studentJson);
  //     const savedStudent = await createdStudent.save();

  //     const applications = await Promise.all(applicationDataJson.map(async (applicationData) => {
  //       const application = new this.applicationModel({
  //         ...applicationData,
  //         studentId: savedStudent._id,
  //       });
  //       return await application.save();
  //     }));

  //     // Handle file uploads
  //     const uploadedDocument = await this.handleFileUploads(
  //       files,
  //       savedStudent._id as any,
  //     );

  //     // Create and save the document
  //     const document = new this.documentModel({
  //       ...uploadedDocument,
  //       studentId: savedStudent._id,
  //     });

  //     const savedDocument = await document.save();

  //     // Update student with documentId
  //     savedStudent.documentId = savedDocument._id as any;

  //     // Save the application
  //     // const savedApplication = await applications.save();

  //     // Update student with applicationIds
  //     savedStudent.applicationsIds = savedStudent.applicationsIds || [];
  //     savedStudent.applicationsIds = applications.map(app => app._id as any);
  //     await savedStudent.save();

  //     return [applications, savedStudent, savedDocument];
  //   } catch (error) {
  //     console.error('Error creating student with application:', error);
  //     throw new Error('Failed to create student with application');
  //   }
  // }
  // private async handleFileUploads(
  //   files: { [key: string]: Express.Multer.File },
  //   studentId: Types.ObjectId,
  // ): Promise<Partial<Document>> {
  //   const filePaths: Partial<Document> = {};

  //   for (const [key, file] of Object.entries(files)) {
  //     if (file) {
  //       const filename = file[0].originalname;
  //       const filePath = path.join(`uploads/${studentId}`, filename);
  //       const fileUrl = `http://localhost:3000/${filePath}`; // Adjust the URL based on your setup

  //       // Move file to the desired path
  //       // fs.renameSync(file.path, filePath);

  //       // Map field names to document fields
  //       switch (key) {
  //         case 'aadhar_photo':
  //           filePaths.aadhar_photo = fileUrl;
  //           break;
  //         case 'student_photo':
  //           filePaths.student_photo = fileUrl;
  //           break;
  //         case 'signature':
  //           filePaths.signature = fileUrl;
  //           break;
  //         case 'degree_certificate':
  //           filePaths.degree_certificate = fileUrl;
  //           break;
  //         case 'intermediate_certificate':
  //           filePaths.intermediate_certificate = fileUrl;
  //           break;
  //         case 'tenth_certificate':
  //           filePaths.tenth_certificate = fileUrl;
  //           break;
  //       }
  //     }
  //   }

  //   return filePaths;
  // }

  // async findAll(): Promise<Student[]> {
  //   return this.studentModel.find().exec();
  // }

  // async findStudentByApplicationId(applicationId: string): Promise<Student> {
  //   const application = await this.applicationModel.findById(applicationId).populate('studentId').exec();
  //   if (!application) {
  //     throw new NotFoundException('Application not found');
  //   }
  //   const student = await this.studentModel.findById(application.studentId).exec();
  //   if (!student) {
  //     throw new NotFoundException('Student not found');
  //   }
  //   return student;
  // }
}
