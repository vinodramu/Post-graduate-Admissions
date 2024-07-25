import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Student } from './schemas/student.schema';
import { Application } from 'src/application/schemas/application.schema';
import { Education } from 'src/education/schema/education.schema';
import { Document } from 'src/document/schemas/document.schema';
import * as path from 'path';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly  studentModel: Model<Student>,
    @InjectModel(Application.name) private readonly  applicationModel: Model<Application>,
    @InjectModel(Document.name) private readonly  documentModel: Model<Document>
  ) {}

  async createStudentWithApplication(
    studentJson: string,
    applicationDataJson: string,
  
    files: { [key: string]: Express.Multer.File }
  ): Promise<any> {
    try {
      // Parse JSON strings into objects
      const student = JSON.parse(studentJson) as Student;
      const applicationData = JSON.parse(applicationDataJson) as Partial<Application>;
  
      // Create and save the student
      const createdStudent = new this.studentModel(student);
      const savedStudent = await createdStudent.save();
  
      // Create and save the application
      const application = new this.applicationModel({
        ...applicationData,
        studentId: savedStudent._id,
      });
  
      // Handle file uploads
      const uploadedDocument = await this.handleFileUploads(files, savedStudent._id as any);
  
      // Create and save the document
      const document = new this.documentModel({
      
        ...uploadedDocument,
        studentId: savedStudent._id,
      });
  
      const savedDocument = await document.save();
  
      // Update student with documentId
      savedStudent.documentId = savedDocument._id as any;
  
      // Save the application
      const savedApplication = await application.save();
  
      // Update student with applicationIds
      savedStudent.applicationsIds = savedStudent.applicationsIds || [];
      savedStudent.applicationsIds.push(savedApplication._id as any);
  
      // Save the updated student
      await savedStudent.save();
  
      return [savedApplication,savedStudent,savedDocument];
    } catch (error) {
      // Handle errors
      console.error('Error creating student with application:', error);
      throw new Error('Failed to create student with application');
    }
  }
   private async handleFileUploads(files: { [key: string]: Express.Multer.File }, studentId: Types.ObjectId): Promise<Partial<Document>> {
    const filePaths: Partial<Document> = {};

    for (const [key, file] of Object.entries(files)) {
      if (file) {
        const filename = file[0].originalname;
        const filePath = path.join('uploads', filename);
        const fileUrl = `http://localhost:3000/${filePath}`; // Adjust the URL based on your setup

        // Move file to the desired path
        // fs.renameSync(file.path, filePath);

        // Map field names to document fields
        switch (key) {
          case 'aadhar_photo':
            filePaths.aadhar_photo = fileUrl;
            break;
          case 'student_photo':
            filePaths.student_photo = fileUrl;
            break;
          case 'signature':
            filePaths.signature = fileUrl;
            break;
          case 'degree_certificate':
            filePaths.degree_certificate = fileUrl;
            break;
          case 'intermediate_certificate':
            filePaths.intermediate_certificate = fileUrl;
            break;
          case 'tenth_certificate':
            filePaths.tenth_certificate = fileUrl;
            break;
        }
      }
    }

    return filePaths;
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async findOne(id: string): Promise<Student> {
    return this.studentModel.findById(id).exec();
  }
  async findStudentById(studentId: string): Promise<Student | null> {
    return this.studentModel.findById(studentId).exec();
  }
}
