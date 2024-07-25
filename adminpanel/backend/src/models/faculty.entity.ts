import mongoose, { Schema } from "mongoose";

export const FacultySchema = new Schema({
    name: { type: String, maxlength: 100, required: true },
    college: { type: Schema.Types.ObjectId, ref: 'College', required: true, unique: true }, 
    subject: { type: String, maxlength: 100, required: true }
});

const Faculty = mongoose.model('Faculty', FacultySchema);
export default Faculty;
