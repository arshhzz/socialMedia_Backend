const express = require("express");
// TODO: Implement comment routes when comment functionality is added

const {
  createComment,
  updateComment,
  deleteComment,
  getPostComments,
} = require("../controllers/comments");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * Comments routes
 * TODO: Implement comment routes when comment functionality is added
 */
// POST /api/comments/post/:post_id - Create a comment on a post
router.post("/post/:post_id", authenticateToken, createComment);

// PUT /api/comments/:comment_id - Update a comment
router.put("/:comment_id", authenticateToken, updateComment);

// DELETE /api/comments/:comment_id - Delete a comment
router.delete("/:comment_id", authenticateToken, deleteComment);

// GET /api/comments/post/:post_id - Get comments for a post
router.get("/post/:post_id", getPostComments);

module.exports = router;
