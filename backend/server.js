import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import busRoutes from './routes/busRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import connectDB from './configDb.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/', busRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));