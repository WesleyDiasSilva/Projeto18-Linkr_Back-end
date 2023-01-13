import { db } from "../../database/connection.js";

export async function createRepost(user_id, post_id) {
  try {
    let query = await db.query(`
        INSERT INTO reposts (user_id, post_id) VALUES ($1, $2)`,
      [user_id, post_id]);

    return { status: true , query: null};
  } catch {
    return { status: false, query: null };
  }
}
