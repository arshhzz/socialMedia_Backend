const { query } = require("../utils/database");

/**
 * Like model for managing post likes
 * TODO: Implement this model for the like functionality
 */

const likePost = async (postId, userId) => {
  const result = await query(
    "INSERT INTO likes (post_id, user_id) VALUES ($1, $2) RETURNING *",
    [postId, userId]
  );
  return result.rows[0];
};

const unlikePost = async (postId, userId) => {
  const result = await query(
    "DELETE FROM likes WHERE post_id = $1 AND user_id = $2",
    [postId, userId]
  );
  return result.rowCount > 0;
};

const getPostLikes = async (postId, limit = 20, offset = 0) => {
  const result = await query(
    `SELECT l.*, u.username, u.full_name FROM likes l 
     JOIN users u ON l.user_id = u.id 
     WHERE l.post_id = $1 
     ORDER BY l.created_at ASC LIMIT $2 OFFSET $3`,
    [postId, limit, offset]
  );
  return result.rows;
};

const getUserLikes = async (userId, limit = 20, offset = 0) => {
  const result = await query(
    `SELECT l.*, p.content, p.media_url FROM likes l 
     JOIN posts p ON l.post_id = p.id 
     WHERE l.user_id = $1 AND p.is_deleted = false 
     ORDER BY l.created_at ASC LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );
  return result.rows;
};

const hasUserLikedPost = async (postId, userId) => {
  const result = await query(
    "SELECT id FROM likes WHERE post_id = $1 AND user_id = $2",
    [postId, userId]
  );
  return result.rows.length > 0;
};

const getPostLikeCount = async (postId) => {
  const result = await query(
    "SELECT COUNT(*) as count FROM likes WHERE post_id = $1",
    [postId]
  );
  return parseInt(result.rows[0].count);
};

module.exports = {
  // Functions will be implemented here
  likePost,
  unlikePost,
  getPostLikes,
  getUserLikes,
  hasUserLikedPost,
  getPostLikeCount
};
