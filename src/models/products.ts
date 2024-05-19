import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    inventory: {
        count: { type: Number, required: true, default: 1 },
        status: { type: String, required: true, default: 'In Stock', enum: ['In Stock', 'Out of Stock', 'Discontinued'] }
    }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
export default Product