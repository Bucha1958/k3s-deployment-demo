import { Request, Response } from 'express';
import { ProductData, inventoryUpdateRequest } from '../types/products.types';
import { Inventory } from '../types/products.types';
import { Product } from '../models/products';
import { Category } from '../models/category'

// Controller to create a new product
export const createProduct = async (req: Request, res: Response) => {
    try {
        // Extracting information from req.body
        const { name, price, categories, initialInventory }: ProductData = req.body;


        // Validation
        if (!name || !price || !initialInventory || initialInventory.count === undefined || !initialInventory.status) {
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
            inventory: {
                count: initialInventory.count || 1,
                status: initialInventory.count > 0 ? 'In Stock' : 'Out of Stock'
            },
        });

        // Save the product to the database
        await product.save();

        // Send a response back to the client
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error('Failed to create the product:', error);
        res.status(500).json({ message: "Failed to create product", error: (error as Error).message });
    }
    
};

// get all products

export const getProduct = async (req: Request, res: Response) => {
    try {
        // All products

        // Fetch all products from collection
        const allProducts = await Product.find()
                .select('name categories price inventory')
                .populate('categories', 'name');
        // Send all the list product as a JSON
        res.json(allProducts);
    } catch (error) {
        console.error('Failed to list product:', error);
        res.status(500).json({ message: "Failed to list product", error: (error as Error).message})
    }
}

// Update Inventory on Sale
export const inventoryUpdateOnProduct = async (req: inventoryUpdateRequest, res: Response) => {
    const { quantity } = req.body as { quantity: number }

    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product?.inventory?.count) {
            product.inventory.count -= quantity;
            product.inventory.status = product.inventory.count > 0 ? 'In Stock' : 'Out of Stock';
        }
       
        await product.save();
        res.status(200).json({ message: "Inventory updated successfully", product });
    } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ message: "Failed to update inventory", error: (error as Error).message });
    }
};


