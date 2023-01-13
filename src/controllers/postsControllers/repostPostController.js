import { postOwnership } from "../../repositories/posts/postOwnership.js";
import { deletePost } from "../../repositories/posts/deletePost.js";
import { createRepost } from "../../repositories/posts/createRepost.js";

export default async function repostPostController(req, res) {
    try {
        const { postId } = req.params;
        const { user } = req.body;

        const deleteData = await createRepost(user.user_id, postId);
        if (!deleteData.status) { return res.sendStatus(422) }

        res.sendStatus(200)

    } catch (error) {
        console.log(error)
        res.status(422).send(error)
    }
}