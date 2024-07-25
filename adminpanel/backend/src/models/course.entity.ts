import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CourseSchema = new Schema({
  name: { type: String, maxlength: 100, required: true },
  fee: { type: mongoose.Types.Decimal128, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }] 
});

const Course = mongoose.model('Course', CourseSchema);
export default Course
