import mongoose from 'mongoose';

// this model is to provide admin to find and update application of student
const applicationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student' // Reference to a Student model if you have one
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'], // Example of possible statuses
        default: 'pending'
    },
    city_preference1: {
        type: String,
        required: true
    },
    city_preference2: {
        type: String,
        required: true
    },
    colleges: {
        type: String,
        required: true
    },
    course_name: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    exam_center_allotment: {
        type: String,
        required: true
    },
    room_allotment: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Create the model
const Application = mongoose.model('Applications', applicationSchema);

module.exports = Application;
