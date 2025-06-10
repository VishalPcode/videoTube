import { v2 as cloudinary  } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) return null;
    // upload the file on cloudinary

    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "auto",
    });
    // console.log("File is uploaded on cloudinary", response.url);
    fs.unlinkSync(localFilepath)
    return response;
  } catch (error) {
    fs.unlinkSync(localFilepath);
    //  remove the locally save as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
