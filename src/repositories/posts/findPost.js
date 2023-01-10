import { db } from "../../database/connection.js"

export async function findPost(id){
  try{
    const {rows} = await db.query(`
      SELECT * FROM posts WHERE id = $1;
    `, [id])
    return {status: true, query: rows}
  }catch (err) {
    return {status: false, query: null}
  }
}