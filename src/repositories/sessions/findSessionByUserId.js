import { db } from "../../database/connection.js";

export async function findSessionByUserId(user_id){
  try {
    const { rows } = await db.query(
      `
      SELECT * FROM sessions WHERE user_id = $1
    `,
      [user_id]
    );
    return { status: true, query: rows };
  } catch (err){
    console.log(err)
    return { status: false, query: null };
  }
}