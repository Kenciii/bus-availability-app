import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const createAdmin = async () => {
  const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME });

  if (!existingAdmin) {
    const hashedPassword = bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    await new Admin({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
    }).save();
    console.log('Admin created successfully!');
  } else {
    console.log('Admin already exists.');
  }

  mongoose.disconnect();
};

createAdmin();
