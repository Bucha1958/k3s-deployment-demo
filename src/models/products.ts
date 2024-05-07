import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    inventory: {
        count: { type: Number, required: true },
        status: { type: String, required: true, enum: ['In Stock', 'Out of Stock', 'Discontinued'] }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Product = mongoose.model('Product', productSchema);

// categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],