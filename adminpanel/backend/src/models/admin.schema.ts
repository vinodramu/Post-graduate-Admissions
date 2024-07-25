/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema } from "mongoose";
import * as bcrypt from 'bcrypt';

export const AdminSchema = new Schema({
    username: { type: String, unique: true, maxlength: 50, required: true },
    password: { type: String, required: true },
    role: { type: String, maxlength: 50, required: true }
});
AdminSchema.pre('save', async function (next) {
    const admin = this as any;
    if (!admin.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(admin.password, salt);
        admin.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

export const Admin = mongoose.model('Admin', AdminSchema);
export default Admin
