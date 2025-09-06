const { query } = require("../utils/database");
const bcrypt = require("bcryptjs");

/**
 * User model for database operations
 */

/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Promise<Object>} Created user
 */
const createUser = async ({ username, email, password, full_name }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await query(
    `INSERT INTO users (username, email, password_hash, full_name, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING id, username, email, full_name, created_at`,
    [username, email, hashedPassword, full_name],
  );

  return result.rows[0];
};

/**
 * Find user by username
 * @param {string} username - Username to search for
 * @returns {Promise<Object|null>} User object or null
 */
const getUserByUsername = async (username) => {
  const result = await query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  return result.rows[0] || null;
};

/**
 * Find user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object|null>} User object or null
 */
const getUserById = async (id) => {
  const result = await query(
    "SELECT id, username, email, full_name, created_at FROM users WHERE id = $1",
    [id],
  );

  return result.rows[0] || null;
};

/**
 * Verify user password
 * @param {string} plainPassword - Plain text password
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} Password match result
 */
const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
// TODO: Implement findUsersByName function for search functionality
// This should support partial name matching and pagination
/**
 * Find users by name (partial matching)
 * @param {string} searchQuery - Name to search for
 * @param {number} limit - Number of users to fetch
 * @param {number} offset - Offset for pagination
 * @returns {Promise<Array>} Array of users
 */
const findUsersByName = async (searchQuery, limit = 20, offset = 0) => {
  const result = await query(
    `SELECT id, username, email, full_name, created_at 
     FROM users 
     WHERE (LOWER(full_name) LIKE LOWER($1) OR LOWER(username) LIKE LOWER($1))
     AND is_deleted = false
     ORDER BY full_name ASC
     LIMIT $2 OFFSET $3`,
    [`%${searchQuery}%`, limit, offset]
  );
  
  return result.rows;
};

// TODO: Implement getUserProfile function that includes follower/following counts

// TODO: Implement updateUserProfile function for profile updates

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  verifyPassword,
  findUsersByName,
};
