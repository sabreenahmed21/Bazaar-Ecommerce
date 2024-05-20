//import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();

import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Cloudinary upload image 
export const cloudinaryUploadImage =  async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(
      fileToUpload, { resource_type: 'auto' }
    );
    return data 
  } catch (error) {
    return error
  }
}

//Cloudinary remove image 
export const cloudinaryRemoveImage =  async (imagePublicId) => {
  try {
    const result = await cloudinary.uploader.destroy(imagePublicId);
    if(!result.ok){ 
      throw new Error('Server Error')
    };
    return result;
  } catch (error) {
    return error
  }
}