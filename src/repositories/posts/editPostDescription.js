import { db } from "../../database/connection.js";
export async function editPostDescription(post_id, description){
    try {
        let query = await db.query(`
          UPDATE posts 
          SET description=$2
          WHERE id=$1`,
          [post_id, description]);
    
        return { status: true , query: null };
      } catch {
        return { status: false, query: null };
      }
}