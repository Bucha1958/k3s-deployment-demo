import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Set up Cloudinary storage with multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'ecommerce-images', // Folder name in Cloudinary
      format: ['jpeg', 'png', 'jpg'], // Supported formats
      public_id: file.originalname.split('.')[0], // Use the original filename without extension as public ID
    };
  },
});

const upload = multer({ storage: storage });

export { upload };
