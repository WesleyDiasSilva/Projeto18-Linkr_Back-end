
import { db } from "../../database/connection.js";

export async function searchUser(req, res){

    const {search} = req.body;
    const {user_id} = req.body.user

    try{ 

        const users = await db.query( `
        SELECT 
            users.id,
            users.username,
            users.picture_url,
            CASE WHEN EXISTS(SELECT * FROM follows WHERE follows.following_id = users.id AND follows.follower_id = $1) THEN true
            ELSE false
            END AS is_following
        FROM users
        LEFT JOIN follows 
        ON users.id = follows.follower_id
        WHERE users.username
        ILIKE $2
        ORDER BY is_following DESC
        LIMIT 10;
        `,
        [user_id, `%${search}%`])

        res.status(200).send(users.rows)

    } catch (err){
        
        console.log(err.message);
        res.status(500).send(err.message);
    }

}