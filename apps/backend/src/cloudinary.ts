import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config(); // Load .env

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const cld = cloudinary.v2;
