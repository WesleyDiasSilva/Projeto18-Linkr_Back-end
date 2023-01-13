import { db } from "../../database/connection.js"

export async function getHashtagPosts(hashtag, limitPage) {
    try {

        if (!limitPage) limitPage = 40;

        const posts = await db.query(`
            SELECT 
                p.id, 	
                p.user_id, 
                p.link, 
                p.description, 
                p.created_at, 
                COUNT(l.post_id) AS "Number_of_likes",
                (select id from likes where user_id=p.user_id and post_id=p.id) as "youLiked",
                u.username, 
                u.picture_url
            FROM users u
            JOIN posts p
                ON p.user_id = u.id
            LEFT JOIN posts_trendings t
                ON t.post_id = p.id
            JOIN trendings h 
                ON  h.id = t.trending_id
            LEFT JOIN likes l
                ON l.post_id = p.id

            WHERE h.name = $1

            GROUP BY 
                    p.id, 
                    u.username, 
                    u.picture_url
                ORDER BY p.id desc
            LIMIT $2;
        `, [hashtag, limitPage])

        return { status: true, rows: posts.rows }

    } catch (error) {
        console.log(error)
        return { status: false, error }
    }
}