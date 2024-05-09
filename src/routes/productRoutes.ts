import express from 'express';
import { createProduct, inventoryUpdateOnProduct } from '../controllers/productController';

const router = express.Router();

// Create product
router.post('/product', createProduct);

// Update product on sell endpoint

router.post('/products/:productId/sell', inventoryUpdateOnProduct);

export default router;
