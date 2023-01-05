import { db } from "../../database/connection.js";

export async function createSession(user_id, token) {
  try {
    await db.query(
      `
      INSERT INTO sessions (token, user_id) VALUES ($1, $2);
    `,
      [token, user_id]
    );
    return { status: true, query: null };
  } catch {
    return { status: false, query: null };
  }
}
