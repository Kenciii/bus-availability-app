import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
});

adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.model('Admin', adminSchema);