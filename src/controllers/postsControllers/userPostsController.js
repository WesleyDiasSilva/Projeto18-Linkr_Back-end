import { getUserPosts } from "../../repositories/posts/getUserPosts.js";
export async function userPostsController(req, res) {
    try {
        const { id } = req.params;
        const posts = await getUserPosts(id);
        if(posts.error)return res.sendStatus(422)
        res.status(200).send(posts.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(422)
    }
}