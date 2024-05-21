import { Request, Response } from 'express';
import { Category } from '../models/category';

interface Data {
    name: string
}

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name }: Data = req.body;

        const category = new Category({ name });
        
        await category.save();
        
        res.status(201).json({message: "Created successfully", category});
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
}

// Get a category by ID
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: `Category with id ${categoryId} not found` });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
};

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const { name }: Data = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: `Category with id ${categoryId} not found` });
        }

        category.name = name || category.name;
        const updatedCategory = await category.save();

        res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: `Category with id ${categoryId} not found` });
        }

        await Category.findByIdAndDelete(categoryId);

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
};