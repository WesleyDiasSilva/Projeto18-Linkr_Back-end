import { postOwnership } from "../../repositories/posts/postOwnership.js";
import { deletePost } from "../../repositories/posts/deletePost.js";

export default async function deletePostController(req, res) {
    try {
        const { postId } = req.params;
        
        const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "");

        const checkOwnerShip = await postOwnership(postId, token);
        if (!checkOwnerShip.status) { return res.sendStatus(406) };

        const deleteData = await deletePost(postId);
        if (!deleteData.status) { res.status(422).send(deleteData.error) }

        res.sendStatus(200)

    } catch (error) {
        console.log(error)
        res.status(422).send(error)
    }
}