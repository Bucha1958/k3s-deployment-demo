import express from "express";
import cors from "cors";
import { upload } from './config/multerConfig';
import uploadRoutes from './routes/routeUpload';



import { connectToDatabase } from './config/database';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', uploadRoutes);

  
  
connectToDatabase()

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


