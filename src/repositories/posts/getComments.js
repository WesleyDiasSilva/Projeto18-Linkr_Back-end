import { db } from "../../database/connection.js";

export async function getComments(post_id){
    try {
        const query = await db.query(`
            SELECT 
                comments.id,
                comments.post_id,
                comments.user_id,
                comments.text,
                comments.created_at,
                users.username,
                users.picture_url
            FROM comments
            JOIN posts
                ON posts.id = comments.post_id
            JOIN users
                ON users.id = comments.user_id
            WHERE posts.id=$1
        `, [post_id]);
        return {status: true, message: query.rows};
    } catch (error) {
        return {status: false, message: null};
    }
}