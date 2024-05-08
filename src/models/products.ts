import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    inventory: {
        count: { type: Number, required: true },
        status: { type: String, required: true, enum: ['In Stock', 'Out of Stock', 'Discontinued'] }
    }
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
