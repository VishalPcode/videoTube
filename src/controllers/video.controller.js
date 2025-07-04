import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Video } from "../models/videomodel.js";

const uploadVideo = asyncHandler(async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);

  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error("Unauthorized: Please login to upload");
  }

  const { title, description, duration } = req.body;

  if (!title || !description || !duration) {
    res.status(400);
    throw new Error("Title, description, and duration are required");
  }

  // ✅ MATCH FIELD NAMES EXACTLY!
  if (!req.files?.videoFile || !req.files?.thumbnail) {
    res.status(400);
    throw new Error("Video file and thumbnail are required");
  }

  // ✅ MATCH FIELD NAMES EXACTLY!
  const videoLocalPath = req.files.videoFile[0].path;
  const thumbnailLocalPath = req.files.thumbnail[0].path;

  // Upload to Cloudinary
  const videoResult = await uploadOnCloudinary(videoLocalPath);
  const thumbnailResult = await uploadOnCloudinary(thumbnailLocalPath);

  if (!videoResult || !thumbnailResult) {
    res.status(500);
    throw new Error("Failed to upload files to Cloudinary");
  }

  // Save to MongoDB
  const newVideo = await Video.create({
    videoFile: videoResult.url,
    thumbnail: thumbnailResult.url,
    title,
    description,
    duration,
    owner: user._id,
  });

  res.status(201).json({
    success: true,
    message: "Video uploaded successfully",
    video: newVideo,
  });
});

export { uploadVideo };
