import { db } from "../../database/connection.js";

export async function getPosts(offset, trending) {
	try {
		let queryString = "";

		queryString += `
		SELECT
			posts.id AS post_id, posts.user_id,
			users.username, users.picture_url,
			posts.link, posts.description,
			COALESCE(COUNT(likes.post_id), 0):: INTEGER AS "Number_of_likes",
			COALESCE(COUNT(comments.post_id), 0):: INTEGER AS comments_post,
			COALESCE(COUNT(reposts.post_id), 0):: INTEGER AS reposts_post,
			posts.created_at
			FROM posts
			JOIN users
			ON posts.user_id = users.id
			LEFT JOIN posts_trendings
			ON posts_trendings.post_id = posts.id
			LEFT JOIN trendings
			ON trendings.id = posts_trendings.trending_id
			LEFT JOIN likes
			ON posts.id = likes.post_id
			LEFT JOIN comments
			ON posts.id = comments.post_id
			LEFT JOIN reposts
			ON posts.id = reposts.post_id
			`;

		if(trending){
			queryString += `
			WHERE tr.name=$2	
			`;
		}

		queryString += `
			GROUP BY posts.id, users.username, users.picture_url
			ORDER BY created_at DESC
			LIMIT $1;`;

		let posts;
			if(trending){
				posts = await db.query(
					queryString,
					[offset * 20, trending]
				);
			}else{
				posts = await db.query(
					queryString,
					[offset * 20]
				);
			}
    	return { status: true, query: posts.rows };
  } catch (err) {
		console.log(err)
		return { status: false, query: null };
  }
}

/*
SELECT 
	p.id, 	
	p.user_id, 
	p.link, 
	p.description, 
	p.created_at, 
	(select count(l) from likes l where l.post_id = p.id) AS "Number_of_likes",
	(select 1 from likes where user_id=p.user_id and post_id=p.id) as "youLiked",
	u.username, 
	u.picture_url
		FROM users u
		JOIN posts p
			ON p.user_id = u.id
		LEFT JOIN posts_trendings t
			ON t.post_id = p.id
		LEFT JOIN likes l
			ON l.post_id = p.id
		LEFT JOIN trendings tr
			ON tr.id = t.trending_id
*/