/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuperAdmin, SuperAdminDocument } from '../models/superadmin.entity';
import { CreateSuperAdminDto } from '../dto/super-admin.dto';
import * as bcrypt from 'bcrypt';
import axios from 'axios';
import { MailService } from '../email-service/mailing.service';
import { ExamCenter } from '../models/examCenter.entity';

export interface Issue {
    message : string
}

@Injectable()
export class SuperAdminService {
    generatedIds: Set<string>;
    constructor(
        @InjectModel(SuperAdmin.name) private superAdminModel: Model<SuperAdminDocument>,
        @InjectModel(ExamCenter.name) private readonly examinationModel: Model<typeof ExamCenter>,
        private readonly mailService: MailService
    ) { this.generatedIds = new Set();  }
    logger = new Logger();
    async create(createSuperAdminDto: CreateSuperAdminDto): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createSuperAdminDto.password, saltRounds);

        const createdSuperAdmin = new this.superAdminModel({
            ...createSuperAdminDto,
            password: hashedPassword,
            adminId: this.generateId()
        });

        const admin = await createdSuperAdmin.save();
        if (admin) return admin.adminId;
    }

    async findAll(): Promise<SuperAdmin[]> {
        return this.superAdminModel.find().exec();
    }

    async approve(applicationId : number)  {
        const response: any = await axios.get(`http://192.168.0.109:3000/students/by-application/${applicationId}`)
        const student = await response.data
        const mailcontent = { 
            email : student.email,
            subject : ' Application approved',
            template : './approval',
            context: {
                name: student.name,
                applicationId: applicationId
            },
        }
        const approved = await axios.patch(`http://192.168.0.109:3000/applications/${applicationId}`,{
            "status" : "approved"
        })
        if(approved.status === 200) {
        await this.mailService.sendEmail(mailcontent) }
        return 'success'
    }

    async emailIssue(applicationId: string, issue: Issue): Promise<unknown> {
        const mailcontent = {
            email: 'harsha@electems.com',
            subject: ' Application Issue',
            template: './applicationstatus',
            context: {
                message: issue.message,
                name: 'Applicant',
                applicationID: applicationId,
                status: 'pending'
            },
        }
        return await this.mailService.sendEmail(mailcontent)
        .then(()=>'success')
        .catch((error)=>`${error}`)
    }
    

    async findAllStudents(page: number, limit: number): Promise<{ students: unknown[], total: number }> {
        this.logger.log(`findAllStudents() - Start: Page: ${page}, Limit: ${limit}`);
        const skip = (page - 1) * limit;

        // Fetch students with unknown registration status
        const response = await axios.get('http://192.168.0.109:3000/api/getalluser');
        const unknownRegistrationStatusStudents = response.data;
        const filteredStudents = unknownRegistrationStatusStudents.filter((student) => student.phoneVerified === 'true');

        // Fetch registered students
        const registeredStudents = await this.examinationModel.find().skip(skip).limit(limit).exec();

        // Combine both arrays
        const students = [...filteredStudents, ...registeredStudents];

        // Calculate total
        const total = students.length;

        this.logger.log(`findAllStudents() - End: Retrieved ${students.length} Students, Total Count: ${total}`);
        return { students, total };
    }

    generateId() {
        let id: string;
        do {
            id = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
        } while (this.generatedIds.has(id));
        this.generatedIds.add(id);
        return id;
    }

    // Add other necessary methods like findOne, update, delete etc.
}
