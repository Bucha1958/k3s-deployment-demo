import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,  // Ensuring no duplicate categories
        trim: true   
    },
    
});

export const Category = mongoose.model('Category', categorySchema);
export default Category