import { Document } from 'mongoose';
export declare class StudentReport {
    reportType: string;
    reportDate: Date;
    totalStudents: number;
    programWise?: Record<string, number>;
    categoryWise?: Record<string, number>;
    inServiceCount?: number;
    exServiceCount?: number;
    subjectWise?: Record<string, number>;
    createdAt: Date;
}
export type StudentReportDocument = StudentReport & Document;
export declare const StudentReportSchema: import("mongoose").Schema<StudentReport, import("mongoose").Model<StudentReport, any, any, any, Document<unknown, any, StudentReport> & StudentReport & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StudentReport, Document<unknown, {}, import("mongoose").FlatRecord<StudentReport>> & import("mongoose").FlatRecord<StudentReport> & {
    _id: import("mongoose").Types.ObjectId;
}>;
