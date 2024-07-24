import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema({
    username: { type: String, unique: true, maxlength: 50, required: true },
    password: { type: String, required: true },
    role: { type: String, maxlength: 50, required: true }
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
