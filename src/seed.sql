CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username VARCHAR(25) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  picture_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL 
)

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL references"users"("id"),
  link TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL 
)

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL references"posts"("id"),
  user_id INTEGER NOT NULL references"users"("id")
)

CREATE TABLE reposts (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL references"posts"("id"),
  user_id INTEGER NOT NULL references"users"("id")
)

CREATE TABLE trendings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(10) UNIQUE NOT NULL,
)

CREATE TABLE posts_trendings (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL references"posts"("id"),
  trending_id INTEGER NOT NULL references"trendings"("id")
)

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY,
  token TEXT NOT NULL,
  user_id INTEGER NOT NULL UNIQUE references"users"("id")
)

CREATE TABLE follows (
  id SERIAL PRIMARY KEY,
  following_id INTEGER NOT NULL UNIQUE references"users"("id"),
  follower_id INTEGER NOT NULL UNIQUE references"users"("id")
)

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL UNIQUE references"posts"("id"),
  user_id INTEGER NOT NULL UNIQUE references"users"("id")
)