import { db } from "../../database/connection.js";

export async function getPosts(offset, trending) {
	try {
		let reposts, posts, normalBaseString, repostBaseString;
			normalBaseString = `
				SELECT
				p.id as post_gid,
				p.user_id,
				p.link,
				p.description,
				u.picture_url,
				u.username,
				p.created_at
			
				FROM posts p
				left JOIN users u ON p.user_id = u.id
			`;

			if(trending){
				normalBaseString =+ `
					WHERE t.name=$2
				`;
			}
			
			normalBaseString += `
				group by  u.picture_url, u.username, post_gid
				order by p.created_at DESC
				LIMIT $1;
			`;
		
			

			repostBaseString = `
				SELECT
				p.id as post_gid,
				p.user_id,
				p.link,
				p.description,
				u.picture_url,
				u.username,
				p.created_at,
				(select p.id from posts p join reposts r on r.post_id=p.id limit 1) as repost_id,
				(select u.id from users u join reposts r on r.user_id=u.id limit 1) as repost_username


				FROM reposts r
				left JOIN users u ON r.user_id = u.id
				left JOIN posts p ON p.id = r.post_id
				left JOIN posts_trendings pt ON p.id = pt.post_id 
				left JOIN trendings t ON t.id = pt.trending_id

				group by p.user_id, post_gid, u.picture_url, u.username
				order by p.created_at DESC
				LIMIT $1;
		`;
		
		if(trending){
			posts = await db.query(normalBaseString, [offset * 20, trending]);
		}else{
			posts = await db.query(normalBaseString, [offset * 20]);
		}
		
		reposts = await db.query(repostBaseString, [offset * 20])	

		const fullQuery = [...reposts.rows, ...posts.rows];
    	return { status: true, query: fullQuery };
  } catch (err) {
		console.log(err)
		return { status: false, query: null };
  }
}
