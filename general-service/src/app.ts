import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/routeUpload';
import { connectToDatabase } from './config/database';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import dotenv from 'dotenv';
dotenv.config();

import path from 'path';


const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));



app.use(cookieParser());
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', uploadRoutes);


// User logout endpoint
app.post('/api/logout', (req: Request, res: Response) => {
    res.cookie('token', '').json('ok');
})
  
connectToDatabase()

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


