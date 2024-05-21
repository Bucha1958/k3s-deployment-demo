import express from "express";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";
import cors from "cors";


import { connectToDatabase } from './config/database';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

app.use(
    "/api/uploadthing",
    createRouteHandler({
        router: uploadRouter,
        config: {},
    })
);
  
connectToDatabase()

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


