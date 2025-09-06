const express = require("express");
// TODO: Implement user routes when follow functionality is added

const {
  follow,
  unfollow,
  getMyFollowing,
  getMyFollowers,
  getFollowStats,
  searchUsers,
} = require("../controllers/users");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

/**
 * User-related routes
 * TODO: Implement user routes when follow functionality is added
 */

// POST /api/users/:user_id/follow - Follow a user
router.post("/:user_id/follow", authenticateToken, follow);

// DELETE /api/users/:user_id/unfollow - Unfollow a user
router.delete("/:user_id/unfollow", authenticateToken, unfollow);

// GET /api/users/following - Get users that current user follows
router.get("/following", authenticateToken, getMyFollowing);

// GET /api/users/followers - Get users that follow current user
router.get("/followers", authenticateToken, getMyFollowers);

// GET /api/users/stats - Get follow stats for current user
router.get("/stats", authenticateToken, getFollowStats);

// GET /api/users/search - Find users by name
router.get("/search", authenticateToken, searchUsers);

module.exports = router;
