import { db } from "../../database/connection.js";

export async function getPosts(offset) {
  try {
    const posts = await db.query(
    `
      SELECT p.id, p.user_id, p.link, p.description, p.created_at, COUNT(l.post_id) AS "Number_of_likes", u.username, u.picture_url
      FROM users u
      JOIN posts p
      ON p.user_id = u.id
      LEFT JOIN likes l
      ON l.post_id = p.id
      GROUP BY p.id, u.username, u.picture_url
      ORDER BY p.id desc
      LIMIT $1
    `,
      [offset * 20]
    );
    return { status: true, query: posts.rows };
  } catch (err) {
    console.log(err)
    return { status: false, query: null };
  }
}
