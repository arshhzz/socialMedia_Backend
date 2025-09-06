// TODO: Implement likes controller
// This controller should handle:
// - Liking posts
// - Unliking posts
// - Getting likes for a post
// - Getting posts liked by a user

const logger = require("../utils/logger");

// TODO: Implement likePost function
// TODO: Implement unlikePost function
// TODO: Implement getPostLikes function
// TODO: Implement getUserLikes function

const {
  likePost,
  unlikePost,
  getPostLikes,
  getUserLikes,
  hasUserLikedPost,
  getPostLikeCount,
} = require("../models/like");
const { getPostById } = require("../models/post");

const likePostHandler = async (req, res) => {
  try {
    const { post_id } = req.params;
    const userId = req.user.id;

    const post = await getPostById(parseInt(post_id));
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const alreadyLiked = await hasUserLikedPost(parseInt(post_id), userId);
    if (alreadyLiked) {
      return res.status(400).json({ error: "Post already liked" });
    }

    const like = await likePost(parseInt(post_id), userId);
    logger.verbose(`User ${userId} liked post ${post_id}`);

    res.status(201).json({
      message: "Post liked successfully",
      like,
    });
  } catch (error) {
    logger.critical("Like post error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const unlikePostHandler = async (req, res) => {
  try {
    const { post_id } = req.params;
    const userId = req.user.id;

    const success = await unlikePost(parseInt(post_id), userId);
    if (!success) {
      return res.status(404).json({ error: "Like not found" });
    }

    logger.verbose(`User ${userId} unliked post ${post_id}`);

    res.json({
      message: "Post unliked successfully",
    });
  } catch (error) {
    logger.critical("Unlike post error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPostLikesHandler = async (req, res) => {
  try {
    const { post_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const likes = await getPostLikes(parseInt(post_id), limit, offset);
    const totalLikes = await getPostLikeCount(parseInt(post_id));

    res.json({
      likes,
      totalLikes
    });
  } catch (error) {
    logger.critical("Get post likes error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUserLikesHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const likes = await getUserLikes(userId, limit, offset);

    res.json({
      likes,
      pagination: {
        page,
        limit,
        hasMore: likes.length === limit,
      },
    });
  } catch (error) {
    logger.critical("Get user likes error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  // Functions will be implemented here
  likePost: likePostHandler,
  unlikePost: unlikePostHandler,
  getPostLikes: getPostLikesHandler,
  getUserLikes: getUserLikesHandler,
};
