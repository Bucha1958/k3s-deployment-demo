import mongoose from "mongoose";
require('dotenv').config();

// Database connection
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', (error as Error).message);
  }
};
