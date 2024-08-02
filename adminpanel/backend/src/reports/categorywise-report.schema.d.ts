import { Document } from 'mongoose';
export declare class CategoryWiseReport {
    categoryName: string;
    reportDate: Date;
    totalStudents: number;
    programWise?: Record<string, number>;
    subjectWise?: Record<string, number>;
    createdAt: Date;
}
export type CategoryWiseReportDocument = CategoryWiseReport & Document;
export declare const CategoryWiseReportSchema: import("mongoose").Schema<CategoryWiseReport, import("mongoose").Model<CategoryWiseReport, any, any, any, Document<unknown, any, CategoryWiseReport> & CategoryWiseReport & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CategoryWiseReport, Document<unknown, {}, import("mongoose").FlatRecord<CategoryWiseReport>> & import("mongoose").FlatRecord<CategoryWiseReport> & {
    _id: import("mongoose").Types.ObjectId;
}>;
