import mongoose from "mongoose";
require('dotenv').config();

const mongourl = process.env.DATABASE_URL;

if (!mongourl) {
  throw new Error("Mongo Url is not defined")
}

// Database connection
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongourl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', (error as Error).message);
  }
};
