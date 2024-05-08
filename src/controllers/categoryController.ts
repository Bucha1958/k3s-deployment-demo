import { Request, Response } from 'express';
import { Category } from '../models/category';

interface Data {
    name: String
}

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name }: Data = req.body;
        const category = new Category({ name });
        await category.save();
        res.status(201).json({message: "Created successfully", category});
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories)
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}