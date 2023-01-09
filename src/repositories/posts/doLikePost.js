import { db } from "../../database/connection.js";

export async function doLikePost(post_id, user_id) {
	try {
		const query = await db.query(`
			SELECT * FROM likes WHERE post_id=$1 AND user_id=$2;`, [post_id, user_id]);

		if(!query.rows[0]){
			await db.query(`INSERT INTO likes (post_id, user_id) VALUES ($1, $2);`, [post_id, user_id]);
		} 
		else{
			await db.query(`DELETE FROM likes WHERE post_id=$1 AND user_id=$2;`, [post_id, user_id]);
		}

		return { status: true, query: null };
	} catch {
		return { status: false, query: null };
	}
}
