import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilepath, resourceType = "auto") => {
  try {
    if (!localFilepath) return null;

    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: resourceType,
      folder: "user-uploads",
    });

    // Remove local file after successful upload
    try {
      fs.unlinkSync(localFilepath);
    } catch (err) {
      console.error("Failed to delete local file:", err);
    }

    return {
      url: response.secure_url,
      public_id: response.public_id,
      duration: response.duration,
    };
  } catch (error) {
    // Remove local file even if upload failed
    try {
      fs.unlinkSync(localFilepath);
    } catch (err) {
      console.error("Failed to delete local file after upload error:", err);
    }
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

export { uploadOnCloudinary };
