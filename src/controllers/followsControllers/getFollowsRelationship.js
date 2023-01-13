import { db } from "../../database/connection.js"

export async function getFollowsRelationship(req, res) {
    try {
        const {userPageId} = req.params;
        const {user} = req.body;
        console.log('here', user.user_id, userPageId)
        const logId = 1;

        
        const follow = await db.query(`
            SELECT * FROM follows
            WHERE follower_id = $1 AND following_id = $2;
        `, [user.user_id, userPageId]);

        if(follow.rowCount === 0)


        res.status(200).send({ followThisUser: true })
    } catch (error) {
        res.status(422).send(error)
    }
}