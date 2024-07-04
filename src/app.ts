import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/routeUpload';
import { connectToDatabase } from './config/database';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import authRoutes from "./routes/authRoutes";
import path from 'path';


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://okxeelfashion.onrender.com',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));



app.use(cookieParser());
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', uploadRoutes);
app.use('/api', authRoutes);

// User logout endpoint
app.post('/api/logout', (req: Request, res: Response) => {
    res.cookie('token', '').json('ok');
})

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The catch-all handler: for any request that doesn't match one above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
  
connectToDatabase()

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


