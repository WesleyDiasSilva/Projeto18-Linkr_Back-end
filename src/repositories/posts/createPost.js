import { db } from "../../database/connection.js";

export async function createPost(link, description, user_id) {
  try {
    let query = await db.query(`
      INSERT INTO posts (user_id, link, description) VALUES ($1, $2, $3) RETURNING id`,
      [user_id, link, description]);

    return { status: true , query: query.rows[0].id };
  } catch {
    return { status: false, query: null };
  }
}
