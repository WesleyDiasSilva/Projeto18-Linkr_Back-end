import { db } from "../../database/connection.js";

export async function deletePost(postId, userId) {
    try {
        console.log("POSTID E USERID", postId,userId)
        await db.query(`
        DELETE FROM posts
        WHERE id = $1 AND user_id = $2;
        `, [postId, userId]);
        return { status: true }
    } catch (error) {
        return { status: false, error: error }
    }
}