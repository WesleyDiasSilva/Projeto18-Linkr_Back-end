import { db } from "../../database/connection.js";

export async function getUserPosts(id) {
    try {
        const posts = await db.query(`
            SELECT * FROM posts
            WHERE user_id = $1
        `, [id]);
        console.log(id,posts)
        return { rows: posts.rows, error: false }
    } catch (error) {
        console.log(error)
        return { error: true }
    }
}