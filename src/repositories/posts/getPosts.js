import { db } from "../../database/connection.js";

export async function getPosts(offset, trending) {
	try {
		let queryString = "";

		queryString += `
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
					LEFT JOIN likes l
						ON l.post_id = p.id`;

		if(trending){
			queryString += `
			WHERE t.trending_id=${trending}
			`;
		}

		queryString += `
			GROUP BY 
				p.id, 
				u.username, 
				u.picture_url
			ORDER BY p.id desc
			LIMIT $1;`;

		const posts = await db.query(
			queryString,
			[offset * 20]
		);
    	return { status: true, query: posts.rows };
  } catch (err) {
		console.log(err)
		return { status: false, query: null };
  }
}
