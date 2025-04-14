// import mongoose from 'mongoose';
// import { Request, Response } from 'express';
// import Order from '../models/order';
// import Product from '../models/products';

// // Create order
// export const createOrder = async (req: Request, res: Response) => {
//     // const { userId } = req.params;
//     // try {
//     //     const { products } = req.body;

//     //     // validate product input
//     //     if (!Array.isArray(products) || products.length === 0) {
//     //         return res.status(400).json({ message: 'products array is required and must not be empty' });
//     //     }

//     //     // Calculate total amount
//     //     let totalAmount = 0;
//     //     for (let item of products) {
//     //         const product = await Product.findById(item.productId);
//     //         if (product) {
//     //             // null check is performed here
//     //             if (!product.) {
//     //                 return res.json({ message: 'product inventory is not available' });
//     //             }
//     //             // check if quantity requested by customer does not exceed the inventory
//     //             if (item.quantity > product..count) {
//     //                 return res.status(400).json({ 
//     //                     message: `The quantity of this product with the id ${item.productId} you requested exceeds the count of inventory. The available count in the store is ${product.inventory.count} `
//     //                 })
//     //             }
//     //             totalAmount += item.quantity * product.price;
//     //         } else {
//     //             return res.status(404).json({ message: `product with this id ${item.productId} not found` });
//     //         }
//     //     }
//     //     // Create new Order
//     //     const newOrder = new Order({
//     //         userId,
//     //         products,
//     //         totalAmount,
//     //         status: 'pending',
//     //     });

//     //     const savedOrder = await newOrder.save();

//     //     // update inventory count for each product
//     //     for (const item of products) {
//     //         await Product.findByIdAndUpdate(item.productId, {
//     //             $inc: { 'inventory.count': -item.quantity }
//     //         });
//     //     }
//     //     res.status(201).json({ message: 'Order created successfully', order: savedOrder });

//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
//     }
// }