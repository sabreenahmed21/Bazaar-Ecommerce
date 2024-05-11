//import { v2 as cloudinary } from "cloudinary";

import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;

cloudinary.config({
  cloud_name: 'dmp2cujg0',
  api_key: '151971593317875',
  api_secret: 'SOvDvYK9pgwru2TPcSSij4YEaU8',
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