import express from 'express';
import { 
    createCategory, 
    deleteCategory, 
    getCategories, 
    getCategoryById, 
    updateCategory
} from '../controllers/categoryController';
import { authenticateToken } from '../middleware';

const router = express.Router();

// Create Category
router.post('/categories', createCategory);
// Get all categories
router.get('/categories', getCategories);
// Get a category
router.get('/categories/:categoryId', getCategoryById);
// Update a category
router.put('/categories/:categoryId', authenticateToken, updateCategory);
// Delete a category
router.delete('/categories/:categoryId', authenticateToken, deleteCategory);

export default router;