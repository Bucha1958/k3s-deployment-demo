import express from "express";
import productRoutes from './routes/productRoutes'; 
import { connectToDatabase } from './config/database';

const app = express();
app.use(express.json());

app.use('/api', productRoutes);

connectToDatabase()

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


