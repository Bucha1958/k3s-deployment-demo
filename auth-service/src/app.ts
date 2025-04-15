import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { connectToDatabase } from './config/database';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(cookieParser());
app.use('/api/auth', authRoutes);

connectToDatabase();

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Auth service running on port ${port}`));
