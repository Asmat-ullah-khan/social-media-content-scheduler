import express from "express";
import { protect } from "../middleware/auth.js";
import * as postCtrl from "../controllers/post.js";

const router = express.Router();

router.use(protect);

router.post("/", postCtrl.createPost);

// GET /api/posts?page=1&limit=10&status=scheduled - List posts (paginated/filtered)
router.get("/", postCtrl.getPosts);

router
  .route("/:id")
  .get(postCtrl.getPost)
  .put(postCtrl.updatePost)
  .delete(postCtrl.deletePost);

export default router;
