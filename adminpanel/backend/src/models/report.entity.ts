import mongoose, { Schema } from "mongoose";

const ReportSchema = new Schema({
    type: { type: String, maxlength: 50, required: true },
    generatedAt: { type: Date, default: Date.now },
    data: { type: Buffer, required: true }
});

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;
