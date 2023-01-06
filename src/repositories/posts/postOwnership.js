import { db } from "../../database/connection.js";

export async function postOwnership(postId, token) {
    try {
        const data = await db.query(`
            SELECT * FROM posts
            JOIN users
                ON posts.user_id = users.id
            JOIN sessions
                ON users.id = sessions.user_id
            WHERE posts.user_id = sessions.user_id AND sessions.token = $1 AND posts.id = $2
        `, [token, postId]);

        if (data.rows.length === 0) { return {status: false} }

        return { status: true}


    } catch (error) {
        return { status: false, error: error }
    }
}