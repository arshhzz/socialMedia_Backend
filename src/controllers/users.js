// TODO: Implement users controller
// This controller should handle:
// - Following a user
// - Unfollowing a user
// - Getting users that the current user is following
// - Getting users that follow the current user
// - Getting follow counts for a user

// TODO: Implement follow function
// TODO: Implement unfollow function
// TODO: Implement getMyFollowing function
// TODO: Implement getMyFollowers function

const {
  followUser,
  unfollowUser,
  getFollowing,
  getFollowers,
  getFollowCounts,
} = require("../models/follow");


const { getUserById } = require("../models/user");
const logger = require("../utils/logger");



const follow = async (req, res) => {
  try {
    const { user_id } = req.params;
    const followerId = req.user.id;
    
    const userToFollow = await getUserById(parseInt(user_id));
    if (!userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const follow = await followUser(followerId, parseInt(user_id));
    res.status(201).json({ message: "User followed successfully", follow });
  } catch (error) {
    if (error.message === "Users cannot follow themselves") {
      return res.status(400).json({ error: error.message });
    }
    logger.critical("Follow error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const unfollow = async (req, res) => {
  try {
    const { user_id } = req.params;
    const followerId = req.user.id;

    const userTounFollow = await getUserById(parseInt(user_id));
    if (!userTounFollow) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const success = await unfollowUser(followerId, parseInt(user_id));
    if (!success) {
      return res.status(404).json({ error: "Follow relationship not found" });
    }
    
    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    logger.critical("Unfollow error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMyFollowing = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    
    const following = await getFollowing(userId, limit, offset);
    res.json({ following });
  } catch (error) {
    logger.critical("Get following error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMyFollowers = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    
    const followers = await getFollowers(userId, limit, offset);
    res.json({ followers });
  } catch (error) {
    logger.critical("Get followers error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFollowStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await getFollowCounts(userId);
    res.json({ stats });
  } catch (error) {
    logger.critical("Get follow stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { q: searchQuery } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    
    if (!searchQuery || searchQuery.trim().length < 2) {
      return res.status(400).json({ error: "Search query must be at least 2 characters" });
    }
    
    const { findUsersByName } = require("../models/user");
    const users = await findUsersByName(searchQuery, limit, offset);
    
    res.json({ 
      users
    });
  } catch (error) {
    logger.critical("Search users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
	// Functions will be implemented here
	follow,
	unfollow,
	getMyFollowing,
	getMyFollowers,
	getFollowStats,
	searchUsers
};
