import cors from 'cors'; 
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
