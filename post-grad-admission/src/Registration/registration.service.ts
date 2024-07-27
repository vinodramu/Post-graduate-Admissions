// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model, Types } from 'mongoose';
// import { Address } from 'src/Address/schemas/address.schema';
// import { Application } from 'src/application/schemas/application.schema';
// import { DocumentEntity } from 'src/document/schemas/document.schema';
// import { CreateRegistrationDto } from 'src/dto/create-registration.dto';
// import { EducationalDetails } from 'src/education/schema/education.schema';
// import { GridFSService } from 'src/file-upload/gridFS.service';
// import { PersonalDetails } from 'src/personalDetails/schemas/personalDetails.schema';
// import { Student } from 'src/student/schemas/student.schema';

// @Injectable()
// export class RegistrationService {
//   constructor(
//     @InjectModel(Student.name) private studentModel: Model<Student>,
//     @InjectModel(PersonalDetails.name)
//     private personalDetailsModel: Model<PersonalDetails>,
//     @InjectModel(Address.name) private addressModel: Model<Address>,
//     @InjectModel(EducationalDetails.name)
//     private educationalDetailsModel: Model<EducationalDetails>,
//     @InjectModel(DocumentEntity.name)
//     private documentEntityModel: Model<DocumentEntity>,
//     @InjectModel(Application.name) private applicationModel: Model<Application>,
//     private readonly gridFSService: GridFSService
//   ) {}

//   async register(
//     createRegistrationDto: CreateRegistrationDto
//   ): Promise<Student> {
//     const {
//       name,
//       dateOfBirth,
//       gender,
//       email,
//       phoneNumber,
//       correspondenseAddress,
//       permanentAddress,
//       state,
//       city,
//       pincode,
//       country,
//       education, // Array of EducationDto
//       status,
//       submissionDate,
//       collegeId,
//       courseId,
//       examCenterAllotment,
//       roomAllotment,
//       fee,
//     } = createRegistrationDto;

//     // Create PersonalDetails
//     const personalDetails = new this.personalDetailsModel({
//       name,
//       dateOfBirth,
//       gender,
//       email,
//       phoneNumber,
//     });
//     const savedPersonalDetails = await personalDetails.save();

//     // Create Address
//     const address = new this.addressModel({
//       correspondenseAddress,
//       permanentAddress,
//       state,
//       city,
//       pincode,
//       country,
//     });
//     const savedAddress = await address.save();

//     // Create EducationalDetails
//     const educationalDetails = new this.educationalDetailsModel({
//       education: education, // Pass the array of education details
//     });
//     const savedEducationalDetails = await educationalDetails.save();

//     const documentEntity = new this.documentEntityModel({});
//     const savedDocumentEntity = await documentEntity.save();

//     // Create Student
//     const student = new this.studentModel({
//       personalDetailsId: savedPersonalDetails._id,
//       addressId: savedAddress._id,
//       educationDetailsId: savedEducationalDetails._id,
//       documentId: savedDocumentEntity._id,
//     });
//     const savedStudent = await student.save();

//     // Create Application
//     const application = new this.applicationModel({
//       studentId: savedStudent._id,
//       status,
//       submissionDate,
//       collegeId,
//       courseId,
//       examCenterAllotment,
//       roomAllotment,
//       fee,
//     });
//     const savedApplication = await application.save();

//     await this.studentModel.findByIdAndUpdate(savedStudent._id, {
//       $push: { applicationIds: savedApplication._id },
//     });
//     await this.personalDetailsModel.findByIdAndUpdate(
//       savedPersonalDetails._id,
//       { studentId: savedStudent._id }
//     );
//     await this.addressModel.findByIdAndUpdate(savedAddress._id, {
//       studentId: savedStudent._id,
//     });
//     await this.educationalDetailsModel.findByIdAndUpdate(
//       savedEducationalDetails._id,
//       { studentId: savedStudent._id }
//     );
//     // await this.documentEntityModel.findByIdAndUpdate(savedDocumentEntity._id, { studentId: savedStudent._id });

//     return savedStudent;
//   }

//   async createOrUpdateDocument(
//     documentId: string,
//     studentId: string,
//     fileData: any
//   ): Promise<any> {
//     let studentObjectId: Types.ObjectId;
//     try {
//       studentObjectId = new Types.ObjectId(studentId);
//     } catch (error) {
//       throw new BadRequestException('Invalid student ID format');
//     }
//     const document = await this.documentEntityModel.findById(documentId);

//     if (!document) {
//       throw new NotFoundException(`Document with ID ${documentId} not found`);
//     }

//     document.studentId = studentObjectId; // Set studentId
//     if (fileData) {
//       // Update file-related fields
//       document.aadharPhoto = fileData.aadharPhoto || document.aadharPhoto;
//       document.studentPhoto = fileData.studentPhoto || document.studentPhoto;
//       document.signature = fileData.signature || document.signature;
//       document.graduationCertificate =
//         fileData.graduationCertificate || document.graduationCertificate;
//       document.twelthCertificate =
//         fileData.twelthCertificate || document.twelthCertificate;
//       document.tenthCertificate =
//         fileData.tenthCertificate || document.tenthCertificate;
//     }

//     const updatedDocument = await document.save();

//     return updatedDocument;
//   }

//   async getStudentDetails(studentId: string): Promise<any> {
//     // Fetch student and populate fields
//     const student = await this.studentModel
//       .findById(studentId)
//       .populate({
//         path: 'personalDetailsId',
//         model: 'PersonalDetails', // Ensure this matches the model name
//       })
//       .populate({
//         path: 'addressId',
//         model: 'Address', // Ensure this matches the model name
//       })
//       .populate({
//         path: 'educationDetailsId',
//         model: 'EducationalDetails', // Ensure this matches the model name
//         populate: {
//           path: 'education',
//           model: 'Education', // Ensure this matches the model name
//         },
//       })
//       .populate({
//         path: 'documentId',
//         model: 'DocumentEntity', // Ensure this matches the model name
//       })
//       .populate({
//         path: 'applicationIds',
//         model: 'Application', // Ensure this matches the model name
//       })
//       .exec();

//     if (!student) {
//       throw new NotFoundException(`Student with ID ${studentId} not found`);
//     }

//     return student;
//   }
// }
