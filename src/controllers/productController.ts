import { Request, Response } from 'express';
import { ProductData } from '../types/products.types';
import { Product } from '../models/products';

// Controller to create a new product
export const createProduct = async (req: Request, res: Response) => {
    try {
        // Extracting information from req.body
        const { name, price, inventory }: ProductData = req.body;

        // Validation (simple example, consider using a library like Joi for complex validations)
        if (!name || !price || !inventory || inventory.count === undefined || !inventory.status) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        // Create a new product instance
        const product = new Product({
            name,
            price,
           //categories, // This should be an array of category IDs
            inventory,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        // Save the product to the database
        await product.save();

        // Send a response back to the client
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error('Failed to create the product:', error);
        res.status(500).json({ message: "Failed to create product" });
    }
};
