import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user data from Frontend
  // validation is not empty
  // check if user alredy exist : username , email
  // check for images , check for avatar
  // upload them to coudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token filed form response
  // check for user creation
  // return response

  const { fullName, email, password, username } = req.body;

  // check the fields are not empty
  if (
    [fullName, email, password, username].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400,"All fields are required");
  }
  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(409,"User already exists");
  }

  const avatarLocalPath = req?.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req?.files?.coverImage?.[0]?.path;
  
  // upload the avatar and cover image to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400,"Avatar upload failed");
  }

  // create user object
  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500,"User creation failed");
  }
  return res.status(201)
    .json(new ApiResponse(201, "User created successfully", createdUser));
});

export { registerUser };
