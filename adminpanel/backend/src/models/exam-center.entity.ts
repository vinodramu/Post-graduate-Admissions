import mongoose, { Schema } from "mongoose";

export const ExamCentreSchema = new Schema({
    name: { type: String, maxlength: 100, required: true },
    city: { type: String, maxlength: 200, required: true },
    capacity: { type: Number, required: true }
});

const ExamCentre = mongoose.model('ExamCentre', ExamCentreSchema);
export default ExamCentre;
