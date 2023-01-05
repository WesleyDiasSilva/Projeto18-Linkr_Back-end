import { db } from "../../database/connection.js";

export async function createPost(link, description, user_id) {
  try {
    await db.query(
      `
      INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3)
    `,
      [user_id, link, description]
    );
    return { status: true, query: null };
  } catch {
    return { status: false, query: null };
  }
}
