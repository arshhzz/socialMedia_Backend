// TODO: Implement comments controller
// This controller should handle:
// - Creating comments on posts
// - Editing user's own comments
// - Deleting user's own comments
// - Getting comments for a post
// - Pagination for comments

const logger = require("../utils/logger");

const {
  createComment,
  updateComment,
  deleteComment,
  getPostComments
} = require("../models/comment");
const { getPostById } = require("../models/post");

const createCommentHandler = async (req, res) => {
  try {
    const { post_id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const post = await getPostById(parseInt(post_id));
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (!post.comments_enabled) {
      return res.status(400).json({ error: "Comments are disabled on this post" });
    }

    const comment = await createComment(parseInt(post_id), userId, content);
    logger.verbose(`User ${userId} commented on post ${post_id}`);

    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    logger.critical("Create comment error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCommentHandler = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const comment = await updateComment(parseInt(comment_id), userId, content);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found or unauthorized" });
    }

    logger.verbose(`User ${userId} updated comment ${comment_id}`);

    res.json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    logger.critical("Update comment error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCommentHandler = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const userId = req.user.id;

    const comment = await deleteComment(parseInt(comment_id), userId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found or unauthorized" });
    }

    logger.verbose(`User ${userId} deleted comment ${comment_id}`);

    res.json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    logger.critical("Delete comment error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPostCommentsHandler = async (req, res) => {
  try {
    const { post_id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const comments = await getPostComments(parseInt(post_id), limit, offset);

    res.json({
      comments
    });
  } catch (error) {
    logger.critical("Get post comments error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  // Functions will be implemented here
  createComment: createCommentHandler,
  updateComment: updateCommentHandler,
  deleteComment: deleteCommentHandler,
  getPostComments: getPostCommentsHandler,
};
