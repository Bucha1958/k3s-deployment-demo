import express from 'express';
import { 
    createProduct, 
    inventoryUpdateOnProduct, 
    getProduct 
} from '../controllers/productController';

const router = express.Router();

// Create product
router.post('/product', createProduct);

// Get all products
router.get('/products', getProduct);

// Update product on sell endpoint

router.post('/products/:productId/sell', inventoryUpdateOnProduct);

export default router;
