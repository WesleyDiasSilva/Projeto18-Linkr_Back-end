import { db } from "../../database/connection.js";

export async function deletePost(postId, userId) {
    try {
        
        const post = await db.query(`
        SELECT * FROM posts
        WHERE id = $1 AND user_id = $2 
        `, [postId, userId])

        if (post.rowCount === 0) return { status: false, error: "THIS POST  IS NOT YOURS" }

        await db.query(`
        DELETE FROM posts_trendings
        WHERE post_id = $1
        `, [postId]);

        await db.query(`
        DELETE FROM posts
        WHERE id = $1 AND user_id = $2
        `, [postId, userId]);

        return { status: true, error: false }

    } catch (error) {
        return { status: false, error: error }
    }
}