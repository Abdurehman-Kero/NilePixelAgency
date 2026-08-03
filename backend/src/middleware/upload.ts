import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// Configuration 
cloudinary.config({
  cloud_name: 'dmxyu3uie',
  api_key: '169911921389218',
  api_secret: '-WfglIX_sWTACMEtIQzOvh5jxCw'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine resource type based on mime type
    let resource_type: 'image' | 'raw' | 'video' | 'auto' = 'auto';
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/msword' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      resource_type = 'raw';
    }

    return {
      folder: 'nilepixel',
      public_id: `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
      resource_type
    };
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimetypes = [
    'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif',
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type. Only images, PDFs, and Docs are allowed.'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB Limit
});
