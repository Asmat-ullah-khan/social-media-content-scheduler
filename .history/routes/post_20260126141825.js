import express from "express";
import { protect } from "../middleware/auth.js";
import * as postCtrl from "../controllers/postController.js"; // All CRUD functions

const router = express.Router();

// Protect all routes with JWT
router.use(protect);

// POST /api/posts - Create new post
router.post("/", postCtrl.createPost);

// GET /api/posts?page=1&limit=10&status=scheduled - List posts (paginated/filtered)
router.get("/", postCtrl.getPosts);

// GET /api/posts/:id - Get single post
// PUT /api/posts/:id - Update post
// DELETE /api/posts/:id - Delete post
router
  .route("/:id")
  .get(postCtrl.getPost)
  .put(postCtrl.updatePost)
  .delete(postCtrl.deletePost);

export default router;
