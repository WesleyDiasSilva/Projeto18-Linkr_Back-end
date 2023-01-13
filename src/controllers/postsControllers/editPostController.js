import { deletePostHashtag } from "../../repositories/posts/deletePostHashtag.js";
import { createHashtag } from "../../repositories/posts/createHashtag.js";
import { editPostDescription } from "../../repositories/posts/editPostDescription.js";
import findHashtag from "find-hashtags";

export async function editPostController(req, res){
    const { post_id, description } = res.locals.data;

    try {
        const hashtags = findHashtag(description);

        await deletePostHashtag(post_id);
        await createHashtag(post_id, hashtags);
        await editPostDescription(post_id, description);

        return res.sendStatus(201)
    } catch (err) {
        console.error(err);
        return res.sendStatus(404);
    }
}