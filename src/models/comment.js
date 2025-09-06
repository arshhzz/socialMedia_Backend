const { query } = require("../utils/database");

/**
 * Comment model for managing post comments
 * TODO: Implement this model for the comment functionality
 */

const createComment = async (postId, userId, content) => {
  const result = await query(
    "INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
    [postId, userId, content]
  );
  return result.rows[0];
};

const updateComment = async (commentId, userId, content) => {
  const result = await query(
    "UPDATE comments SET content = $1 WHERE id = $2 AND user_id = $3 AND is_deleted = false RETURNING *",
    [content, commentId, userId]
  );
  return result.rows[0] || null;
};

const deleteComment = async (commentId, userId) => {
  const result = await query(
    "UPDATE comments SET is_deleted = true WHERE id = $1 AND user_id = $2 RETURNING *",
    [commentId, userId]
  );
  return result.rows[0] || null;
};

const getPostComments = async (postId, limit = 20, offset = 0) => {
  const result = await query(
    `SELECT c.*, u.username, u.full_name FROM comments c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.post_id = $1 AND c.is_deleted = false 
     ORDER BY c.created_at ASC LIMIT $2 OFFSET $3`,
    [postId, limit, offset]
  );
  return result.rows;
};

const getCommentById = async (commentId) => {
  const result = await query(
    `SELECT c.*, u.username, u.full_name FROM comments c 
     JOIN users u ON c.user_id = u.id 
     WHERE c.id = $1 AND c.is_deleted = false`,
    [commentId]
  );
  return result.rows[0] || null;
};

module.exports = {
  // Functions will be implemented here
  createComment,
  updateComment,
  deleteComment,
  getPostComments,
  getCommentById
};
