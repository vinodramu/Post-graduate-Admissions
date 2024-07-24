import mongoose, { Schema } from "mongoose";

const ExamAllotmentSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true }, 
    examCentre: { type: Schema.Types.ObjectId, ref: 'ExamCentre', required: true }, 
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }, 
    date: { type: Date, required: true }
});

const ExamAllotment = mongoose.model('ExamAllotment', ExamAllotmentSchema);
module.exports = ExamAllotment;
