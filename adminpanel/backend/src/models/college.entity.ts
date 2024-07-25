import mongoose, { Schema } from "mongoose";

export const CollegeSchema = new Schema({
    name: { type: String, maxlength: 100, required: true },
    location: { type: String, maxlength: 200, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }], 
    contactinfo: { type: String, required: true }
});

const College = mongoose.model('College', CollegeSchema);
export default College
