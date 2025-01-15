import mongoose from 'mongoose'
import { User } from '../types/products.types';


const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, min: 4, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

const UserModal = mongoose.model<User>('User', UserSchema);

export default UserModal;