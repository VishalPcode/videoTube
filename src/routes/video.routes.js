import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadVideo, getMyVideos } from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/addvideo",
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  uploadVideo
);
router.get('/my-videos', verifyJWT, getMyVideos);

export default router;
