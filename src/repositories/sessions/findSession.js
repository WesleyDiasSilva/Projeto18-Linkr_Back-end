import { db } from "../../database/connection.js";

export async function findSession(token) {
  try {
    const { rows } = await db.query(
      `
      SELECT * FROM sessions WHERE token = $1
    `,
      [token]
    );
    return { status: true, query: rows };
  } catch {
    return { status: false, query: null };
  }
}
