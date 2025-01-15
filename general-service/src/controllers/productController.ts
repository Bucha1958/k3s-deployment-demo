import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { ProductData, inventoryUpdateRequest } from '../types/products.types';
import { Product } from '../models/products';
import { Category } from '../models/category'
import mongoose from 'mongoose';
import { upload } from '../config/multerConfig';

// Controller for product creation and image upload


export const createProductWithImages = [
    upload.array('images', 5),
    async (req: Request, res: Response) => {
        try {

            const { name, price }: ProductData = req.body;
            const categories = JSON.parse(req.body.categories);

            if (!name || !price) {
                return res.status(400).json({ message: "All required fields must be filled" });
            }

            // Validate category names and fetch their IDs
            const categoryIds = await Promise.all(
                categories.map(async (categoryName: string) => {
                    const category = await Category.findOne({ name: categoryName });
                    return category ? category._id : null;
                })
            );

            // Filter out null IDs (categories not found)
            const validCategoryIds = categoryIds.filter(id => id !== null);

            if (validCategoryIds.length === 0) {
                return res.status(400).json({ message: "No valid categories found" });
            }

            if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
                return res.status(400).json({ message: 'Images are required' });
            }

            const imageUrls = (req.files as Express.Multer.File[]).map(file => (file as any).path);

            const newProduct = new Product({
                name,
                price,
                categories: validCategoryIds,
                images: imageUrls,
            });

            const savedProduct = await newProduct.save();
            res.status(201).json({ message: 'Product created successfully', product: savedProduct });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
        }
    }
];


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

export const getProducts = async (req: Request, res: Response) => {
    try {
      const { q, category } = req.query;
  
      // Build the query object
      let query: any = {};
      if (category) {
        const categoryDoc = await Category.findOne({ name: category as string });
        if (categoryDoc) {
          query.categories = categoryDoc._id;
        } else {
          return res.status(400).json({ message: 'Invalid category name' });
        }
      }
      if (q) {
        query.name = { $regex: new RegExp(q as string, 'i') };
      }
  
      // Fetch products based on the query, sorted by creation date
      const products = await Product.find(query)
        .sort({ createdAt: -1 }) // Sort by creation date in descending order
        .select('name categories price images')
        .populate('categories', 'name');
  
      // Send the list of products as a JSON response
      res.json(products);
    } catch (error) {
      console.error('Failed to list products:', error);
      res.status(500).json({ message: 'Failed to list products', error: (error as Error).message });
    }
  };

// get a product

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const productFound = await Product.findById(productId)
                .populate('categories', 'name');

        if (!productFound) {
            return res.status(404).json({ error: `product with this id ${productId} not found `});
        }

        res.status(200).json({ succesful: 'Succesfully retrieved', productFound });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
}


// Update a product name

export const updateProduct = [
    upload.array('images', 2),
    async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const { name, price, categories }: ProductData = req.body;

        const productFound = await Product.findById(productId);

        if (!productFound) {
            return res.status(404).json({ error: `Product with id ${productId} not found` });
        }

        // Update fields if they are provided in the request
        if (name) productFound.name = name;
        if (price) productFound.price = price;

        // Handle categories
        if (Array.isArray(categories) && categories.length > 0) {
            const categoryIds = await Promise.all(
                categories.map(async (categoryName: string) => {
                    const category = await Category.findOne({ name: categoryName });
                    return category ? category._id : null;
                })
            );

            // Filter null IDs (categories not found)
            const validCategoryIds = categoryIds.filter((id): id is mongoose.Types.ObjectId => id !== null);

            if (validCategoryIds.length === 0) {
                return res.status(400).json({ message: "No valid categories found" });
            }

            productFound.categories = validCategoryIds;
        }

        

        if (req.files && (req.files as Express.Multer.File[]).length > 0) {
            // Delete old images from cloudinary
            if (productFound.images && productFound.images.length > 0) {
                for (const url of productFound.images) {
                    const publicId = url.split('/').pop()?.split('.')[0]; // public Id
                    await cloudinary.uploader.destroy(`ecommerce-images/${publicId}`)
                }
            }
             // upload new images to cloudinary
            const imageUrls = (req.files as Express.Multer.File[]).map(file => (file as any).path);
            productFound.images = imageUrls;
        
        }

        // Save the updated product
        const updatedProduct = await productFound.save();

        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
}];



// Delete a product

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const productFound = await Product.findById(productId);

        if (!productFound) {
            return res.status(404).json({message: `product with this id ${productId} not found`});
        }

        // delete images from cloudinary
        if (productFound.images && productFound.images.length > 0) {
            for (const url of productFound.images) {
                const filename = url.split('/').pop();
                const publicId = filename?.split('.')[0];
                if (publicId) {
                    await cloudinary.uploader.destroy(`ecommerce-images/${publicId}`);
                }
            }
        }
        // deleted successfully
        await Product.findByIdAndDelete(productId);

        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
}

// Update Inventory on Sale
// export const inventoryUpdateOnProduct = async (req: inventoryUpdateRequest, res: Response) => {
//     const { quantity } = req.body as { quantity: number }

//     try {
//         const product = await Product.findById(req.params.productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         if (product?.inventory?.count) {
//             product.inventory.count -= quantity;
//             product.inventory.status = product.inventory.count > 0 ? 'In Stock' : 'Out of Stock';
//         }
       
//         await product.save();
//         res.status(200).json({ message: "Inventory updated successfully", product });
//     } catch (error) {
//         console.error('Error updating inventory:', error);
//         res.status(500).json({ message: "Failed to update inventory", error: (error as Error).message });
//     }
// };


