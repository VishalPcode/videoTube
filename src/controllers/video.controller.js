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

  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error("Title and description are required");
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
const videoResult = await uploadOnCloudinary(videoLocalPath, "video"); // ✅ force video
const thumbnailResult = await uploadOnCloudinary(thumbnailLocalPath, "image"); // optional

console.log("Video Cloudinary result:", videoResult); // check for .duration
console.log("Thumbnail Cloudinary result:", thumbnailResult);

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
    duration: videoResult.duration,
    owner: user._id,
  });

  res.status(201).json({
    success: true,
    message: "Video uploaded successfully",
    video: newVideo,
  });
});

const getMyVideos = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Logged-in user's ID
  const videos = await Video.find({ owner: userId }).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    videos,
  });
});


export { uploadVideo, getMyVideos };
