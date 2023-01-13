import { getHashtagPosts } from "../../repositories/posts/getHashtagPosts.js";

export async function trendingsController(req, res) {
    try {
        const { hashtag } = req.params;
        const { page } = req.query;

        const posts = await getHashtagPosts(hashtag, page);
        if (posts.error) return res.status(422).send(posts.error);

        res.status(200).send(posts.rows);

    } catch (error) {
        console.log(error)
        res.status(422).send(error)
    }
}