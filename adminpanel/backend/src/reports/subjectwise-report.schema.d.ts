import { Document } from 'mongoose';
export declare class SubjectWiseReport {
    subjectName: string;
    reportDate: Date;
    totalStudents: number;
    programWise?: Record<string, number>;
    categoryWise?: Record<string, number>;
    createdAt: Date;
}
export type SubjectWiseReportDocument = SubjectWiseReport & Document;
export declare const SubjectWiseReportSchema: import("mongoose").Schema<SubjectWiseReport, import("mongoose").Model<SubjectWiseReport, any, any, any, Document<unknown, any, SubjectWiseReport> & SubjectWiseReport & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SubjectWiseReport, Document<unknown, {}, import("mongoose").FlatRecord<SubjectWiseReport>> & import("mongoose").FlatRecord<SubjectWiseReport> & {
    _id: import("mongoose").Types.ObjectId;
}>;
