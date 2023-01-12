import { db } from "../../database/connection.js";


export async function getHashtags() {
    try {
        const query = await db.query(`
        SELECT * FROM trendings;`);
        return { status: true, query: query.rows };
    }catch(err){
        return { status: false, query: null };
    }
}

/*
SELECT COUNT(t.trending_id)
FROM trendings tr
JOIN posts_trendings t
	ON t.trending_id = t.id
GROUP BY
	tr.name, t.trending_id, t.id
ORDER BY 
	t.id;
*/