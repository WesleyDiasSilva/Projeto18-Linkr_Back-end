import { postOwnership } from "../../repositories/posts/postOwnership.js";
import { deletePost } from "../../repositories/posts/deletePost.js";

export default async function deletePostController(req, res) {
    try {
        const { postId } = req.params;
        const { user } = req.body;

        const deleteData = await deletePost(postId, user.user_id);
        if (!deleteData.status) { return res.status(422).send(deleteData.error) }

        res.sendStatus(200)

    } catch (error) {
        console.log(error)
        res.status(422).send(error)
    }
}