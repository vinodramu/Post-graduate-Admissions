import { Document } from 'mongoose';
export declare class ProgramWiseReport {
    programName: string;
    reportDate: Date;
    totalStudents: number;
    categoryWise?: Record<string, number>;
    subjectWise?: Record<string, number>;
    createdAt: Date;
}
export type ProgramWiseReportDocument = ProgramWiseReport & Document;
export declare const ProgramWiseReportSchema: import("mongoose").Schema<ProgramWiseReport, import("mongoose").Model<ProgramWiseReport, any, any, any, Document<unknown, any, ProgramWiseReport> & ProgramWiseReport & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProgramWiseReport, Document<unknown, {}, import("mongoose").FlatRecord<ProgramWiseReport>> & import("mongoose").FlatRecord<ProgramWiseReport> & {
    _id: import("mongoose").Types.ObjectId;
}>;
