import { db } from "../../database/connection.js";

export async function findUserByEmail(email) {
  try {
    const user = await db.query(
      `
    SELECT * FROM users WHERE email = $1
    `,
      [email]
    );
    return { status: true, query: user.rows };
  } catch (err) {
    return { status: false, query: null };
  }
}
