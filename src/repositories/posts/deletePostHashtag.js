import { db } from "../../database/connection.js";
export async function deletePostHashtag(post_id){
    try {
        await db.query(`
          DELETE FROM posts_trendings
          WHERE post_id=$1;`,
          [post_id]);
    
        await db.query(`
          DELETE FROM trendings
          WHERE id IN (SELECT trending_id FROM posts_trendings);
        `)

        return { status: true , query: null };
      } catch {
        return { status: false, query: null };
      }
}