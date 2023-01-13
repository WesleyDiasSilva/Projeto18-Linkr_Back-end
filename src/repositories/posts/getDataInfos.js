import { db } from "../../database/connection.js";

export async function getDataInfos(post_id){
    try {

        //* GET likes
        const query_1 = await db.query(`
            select * 
            from likes
            where likes.post_id = $1;
        `, [post_id]);
        
        //* GET comments
        const query_2 = await db.query(`
            select * 
            from comments 
            where comments.post_id = $1;
        `, [post_id]);

        //* GET re-tweets
        const query_3 = await db.query(`
            select * 
            from reposts 
            where reposts.post_id = $1;
        `, [post_id]);

        const fullQuery = {likes: query_1.rows, comments: query_2.rows, reposts: query_3.rows};

        return {status: true, query: fullQuery}
    } catch (err) {
        return {status: false, query: null}
    }
} 
