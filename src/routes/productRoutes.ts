import express from 'express';
import { createProduct } from '../controllers/productController';

const router = express.Router();

// Create product
router.post('/product', createProduct);

export default router;
