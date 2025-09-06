/**
 * Follow model for managing user relationships
 * TODO: Implement this model for the follow functionality
 */


const { query } = require("../utils/database");

const followUser = async (followerId, followingId) => {
  if (followerId === followingId) {
    throw new Error("Users cannot follow themselves");
  }
  
  const result = await query(
    "INSERT INTO follows (follower_id, following_id) VALUES ($1, $2) RETURNING *",
    [followerId, followingId]
  );
  return result.rows[0];
};

const unfollowUser = async (followerId, followingId) => {
  const result = await query(
    "DELETE FROM follows WHERE follower_id = $1 AND following_id = $2",
    [followerId, followingId]
  );
  return result.rowCount > 0;
};

const getFollowing = async (userId, limit = 20, offset = 0) => {
  const result = await query(
    `SELECT u.id, u.username, u.full_name FROM follows f 
     JOIN users u ON f.following_id = u.id 
     WHERE f.follower_id = $1 AND u.is_deleted = false 
     ORDER BY f.created_at ASC LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );
  return result.rows;
};

const getFollowers = async (userId, limit = 20, offset = 0) => {
  const result = await query(
    `SELECT u.id, u.username, u.full_name FROM follows f 
     JOIN users u ON f.follower_id = u.id 
     WHERE f.following_id = $1 AND u.is_deleted = false 
     ORDER BY f.created_at ASC LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );
  return result.rows;
};

const getFollowCounts = async (userId) => {
  const followingResult = await query(
    "SELECT COUNT(*) as count FROM follows WHERE follower_id = $1",
    [userId]
  );
  const followersResult = await query(
    "SELECT COUNT(*) as count FROM follows WHERE following_id = $1",
    [userId]
  );
  
  return {
    following: parseInt(followingResult.rows[0].count),
    followers: parseInt(followersResult.rows[0].count)
  };
};

module.exports = {
	// Functions will be implemented here
	followUser,
	unfollowUser,
	getFollowing,
	getFollowers,
	getFollowCounts
};
