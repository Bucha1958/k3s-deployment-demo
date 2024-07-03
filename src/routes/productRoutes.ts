import express from 'express';
import { 
    createProduct, 
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    createProductWithImages
} from '../controllers/productController';

import { authenticateToken } from '../middleware';

const router = express.Router();

// Create product with image
router.post('/product', createProductWithImages);

// Create product
// router.post('/product', createProduct);

// Get all products
router.get('/products', getProducts);

// Get a product
router.get('/products/:productId', getProduct);

// Update a product
router.put('/products/:productId', updateProduct);

// Delete a product
router.delete('/products/:productId',  deleteProduct);

// Update product on sell endpoint

// router.post('/products/:productId/sell', authenticateToken, inventoryUpdateOnProduct);

export default router;
