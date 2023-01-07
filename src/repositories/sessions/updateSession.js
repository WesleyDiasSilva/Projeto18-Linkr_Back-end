import { db } from "../../database/connection.js";

export async function updateSession(user_id, token) {
  try {
    await db.query(
      `
    UPDATE sessions SET token = $1 WHERE user_id = $2
    `,
      [token, user_id]
    );
    return { status: true, query: null };
  } catch (err) {
    console.log(err)
    return { status: false, query: null };
  }
}
