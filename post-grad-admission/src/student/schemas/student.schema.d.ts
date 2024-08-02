import { Document } from 'mongoose';
import { Types } from 'mongoose';
export declare class Student extends Document {
    personalDetailsId: Types.ObjectId;
    addressId: Types.ObjectId;
    educationDetailsId: Types.ObjectId;
    documentId: Types.ObjectId;
    applicationIds: Types.ObjectId[];
}
export declare const StudentSchema: import("mongoose").Schema<Student, import("mongoose").Model<Student, any, any, any, Document<unknown, any, Student> & Student & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Student, Document<unknown, {}, import("mongoose").FlatRecord<Student>> & import("mongoose").FlatRecord<Student> & Required<{
    _id: unknown;
}>>;
