CREATE TABLE users (
  id SERIAL INTEGER PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username VARCHAR(25) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  picture_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL 
)

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  post_id INTEGER references "posts"("id") NOT NULL,
  user_id INTEGER references "users"("id") NOT NULL
)

CREATE TABLE posts (
  id SERIAL INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL references"users"("id"),
  link TEXT NOT NULL,
  description TEXT NOT NULL,
  update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL 
)

CREATE TABLE posts_trendings (
  id SERIAL INTEGER PRIMARY KEY,
  post_id INTEGER NOT NULL references "posts"("id"),
  trending_id INTEGER NOT NULL references "trendings"("id")
)

CREATE TABLE trendings (
  id SERIAL INTEGER PRIMARY KEY,
  name VARCHAR(10) UNIQUE NOT NULL,
)