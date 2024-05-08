import express from "express"; 
import { connectToDatabase } from './config/database';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app = express();
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

connectToDatabase()

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


