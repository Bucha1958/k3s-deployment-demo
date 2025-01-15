import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
    userId: mongoose.Types.ObjectId,
    products: {
        productId: mongoose.Types.ObjectId,
        quantity: number
    }[],
    totalAmount: number,
    status: string,
    createdAt: Date,
    updatedAt: Date

}


const orderSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'pending' },  
}, {
    timestamps: true
});

export default mongoose.model<IOrder>('Order', orderSchema);