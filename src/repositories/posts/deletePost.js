import { db } from "../../database/connection.js";

export async function deletePost(postId) {
    try {
        await db.query(`
            DELETE FROM posts
            WHERE user_id = $1;
        `, [postId]);
        return { status: true}
    } catch (error) {
        return { status: false, error: error }
    }
}