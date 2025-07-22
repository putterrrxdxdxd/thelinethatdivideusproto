// src/mediaController.ts
import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cld } from './cloudinary.js';

export const mediaRouter: express.Router = express.Router();

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cld,
  params: async (req, file) => ({
    folder: 'theline-media', // Optional: Folder in Cloudinary
    resource_type: 'auto',   // auto-detect file type
    public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
  })
});

const upload = multer({ storage });

// POST /media/upload
mediaRouter.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file as Express.Multer.File;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = (req.file as any).path; // Cloudinary gives the URL in .path
  console.log(`📦 Uploaded to Cloudinary: ${fileUrl}`);
  res.json({ url: fileUrl });
});
