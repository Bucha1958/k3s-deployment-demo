import { Request, Response } from 'express';
import { ProductData } from '../types/products.types';
import { Product } from '../models/products';
import { Category } from '../models/category'

// Controller to create a new product
export const createProduct = async (req: Request, res: Response) => {
    try {
        // Extracting information from req.body
        const { name, price, categories, inventory }: ProductData = req.body;


        // Validation (simple example, consider using a library like Joi for complex validations)
        if (!name || !price || !inventory || inventory.count === undefined || !inventory.status) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const categoryIds = await Promise.all(
            categories.map(async (categoryName) => {
                const category = await Category.findOne({ name: categoryName });
                return category ? category._id : null;
            })
        );

        // Filter null IDs (categories not found)
        const validCategoryIds = categoryIds.filter(id => id !== null);

        if (validCategoryIds.length === 0) {
            return res.status(400).json({ message: "No valid categories found" });
        }

        // Create a new product instance
        const product = new Product({
            name,
            price,
            categories: validCategoryIds,
            inventory,
        });

        // Save the product to the database
        await product.save();

        // Send a response back to the client
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error: any) {
        console.error('Failed to create the product:', error);
        res.status(500).json({ message: "Failed to create product", error: error.message });
    }
    
};


