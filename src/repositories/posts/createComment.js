import { db } from "../../database/connection.js";

export async function createComment(post_id, user_id, text){
    try {
        await db.query(`
            INSERT INTO comments (post_id, user_id, text) VALUES ($1, $2, $3)
        `, [post_id, user_id, text]);
        return { status: true, query: null };
    } catch (error) {
        return { status: false, query: null };
    }
}