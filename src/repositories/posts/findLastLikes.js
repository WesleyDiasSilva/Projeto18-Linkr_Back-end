import { db } from "../../database/connection.js"

export async function findLastLikes(id){
  try{
    const {rows} = await db.query(`
    SELECT u.username FROM users u
    JOIN likes l
    ON l.user_id = u.id
    WHERE l.post_id = $1
    ORDER BY l.id DESC
    LIMIT 3;
    `, [id])
    return {status: true, query: rows}
  }catch (err) {
    console.log(err)
    return {status: false, query: null}
  }
}