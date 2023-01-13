import { db } from "../../database/connection.js";

export async function getPosts(offset, trending) {
	try {
		let posts = await db.query(`
				SELECT
				p.id as post_gid,
				p.user_id,
				p.link,
				p.description,
				u.picture_url,
				u.username,
				count(l.post_id) as number_of_likes,
				count(c.post_id) as comments_post,
				count(r.post_id) as reposts_post,
				p.created_at
				
				FROM posts_trendings pt
				JOIN posts p ON pt.id = pt.post_id
				left JOIN users u ON p.user_id = u.id
				JOIN trendings t ON pt.trending_id = t.id
				left JOIN likes l ON p.id = l.post_id
				left JOIN comments c ON p.id = c.post_id
				left JOIN reposts r ON p.id = r.post_id
				
				group by pt.trending_id, u.picture_url, u.username, post_gid
				order by p.created_at DESC
				LIMIT $1;
			`, [offset * 20]);

		let reposts = await db.query(`
				SELECT
				p.id as post_gid,
				p.user_id,
				p.link,
				p.description,
				u.picture_url,
				u.username,
				count(l.post_id) as number_of_likes,
				count(c.post_id) as comments_post,
				count(r.post_id) as reposts_post,
				p.created_at

				FROM posts_trendings pt
				JOIN posts p ON pt.id = pt.post_id
				left JOIN users u ON p.user_id = u.id
				JOIN trendings t ON pt.trending_id = t.id
				left JOIN likes l ON p.id = l.post_id
				left JOIN comments c ON p.id = c.post_id
				left JOIN reposts r ON p.id = r.post_id
				
				WHERE t.name=$2
				group by pt.trending_id, u.picture_url, u.username, post_gid
				order by p.created_at DESC
				LIMIT $1;
		`, [offset * 20, trending]);
			

		const fullQuery = [...reposts.rows, ...posts.rows];
    	return { status: true, query: fullQuery };
  } catch (err) {
		console.log(err)
		return { status: false, query: null };
  }
}
