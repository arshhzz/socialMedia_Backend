# Social Media Backend

#### A Node.js + Express.js backend API for a social media platform, featuring user authentication, posts, comments, likes, and follow system.
#### Built with PostgreSQL for persistence and structured in an MVC architecture with secure coding practices.

### 🚀 Features

User authentication with JWT and password hashing with bcrypt
Create, read, and manage posts with optional media
Comments and likes system for user engagement
Follow/unfollow functionality between users
Auto-updated updated_at timestamps using PostgreSQL triggers
Indexes on frequently queried columns for optimized performance
Health check endpoint (/health)
Centralized error handling and logging

### 🛠 Tech Stack

#### Backend: Node.js, Express.js
#### Database: PostgreSQL (pg library for connection)
#### Security: Helmet, CORS, JWT, bcrypt
#### Dev Tools: Nodemon, Winston-based custom logger

### ⚙️ Setup Instructions

Install dependencies:

npm install


Create a .env file in the project root:

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=social_media_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development


Set up PostgreSQL database and initialize schema:

npm run setup:db
This will create the following tables:
users (with username, email, password, etc.)
posts (with text/media content)
comments (with soft-delete and timestamps)
likes (unique per user+post)

follows (follower/following relation)

✅ Includes triggers to auto-update updated_at
✅ Includes indexes for better query performance

▶️ Running the Application
Development mode (auto-reload with Nodemon):
npm run dev

Production mode:
npm start

### 📜 Available npm Scripts

npm start → Run in production mode
npm run dev → Run in development mode with auto-reload
npm run start:verbose → Start with verbose logging
npm run start:critical → Start with critical-only logging
npm run setup:db → Initialize database schema

## 🌐 API Endpoints
### Authentication

POST /api/auth/register – Register a new user

POST /api/auth/login – Authenticate and return JWT

### Users

GET /api/users/:id – Get user profile

GET /api/users – Get all users

DELETE /api/users/:id – Soft-delete a user

### Posts

POST /api/posts – Create a new post

GET /api/posts/:id – Get a single post

GET /api/posts – List posts with pagination

DELETE /api/posts/:id – Soft-delete a post

### Comments

POST /api/comments – Add comment to post

GET /api/comments/:post_id – Fetch comments with pagination

### Likes

POST /api/likes – Like a post

DELETE /api/likes/:id – Unlike a post

### Follows

POST /api/follows – Follow a user

DELETE /api/follows/:id – Unfollow a user

### Health Check

GET /health – Returns API status and timestamp

## 🧩 Architecture

The project follows MVC architecture:

Routes → Define API endpoints

Controllers → Business logic for each feature

Models → Database queries (via pg)

Utils → Reusable helpers (logger, database pool)

## 🛡 Security Practices

Passwords hashed with bcrypt

Authentication with JWT

Middleware protection with Helmet and CORS

Centralized error and logging system


### Feel Free to Contribute and make it better.