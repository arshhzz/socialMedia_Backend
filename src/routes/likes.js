const express = require("express");
// TODO: Implement like routes when like functionality is added

const {
  likePost,
  unlikePost,
  getPostLikes,
  getUserLikes,
} = require("../controllers/likes");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * Likes routes
 * TODO: Implement like routes when like functionality is added
 */

// POST /api/likes/post/:post_id - Like a post
router.post("/post/:post_id", authenticateToken, likePost);

// DELETE /api/likes/post/:post_id - Unlike a post
router.delete("/post/:post_id", authenticateToken, unlikePost);

// GET /api/likes/post/:post_id - Get likes for a post
router.get("/post/:post_id", getPostLikes);

// GET /api/likes/user - Get posts liked by current user
router.get("/user", authenticateToken, getUserLikes);

module.exports = router;
