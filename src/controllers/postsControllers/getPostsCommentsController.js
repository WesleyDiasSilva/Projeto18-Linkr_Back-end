import { getComments } from "../../repositories/posts/getComments.js";
import { getPostComments } from "../../models/posts/getPostComments.js";
export async function getPostsCommentsController(req, res) {
  try {
    const { post_id } = req.query;

    const validation = getPostComments.validate({post_id}, {abortEarly: false})
    if(validation.error){
        return res.status(400).send(validation.error)
    }

    const posts = await getComments(post_id)
    if(posts.status){
      return res.status(200).send(posts.message)
    }
    return res.status(400).send(posts.message)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err);
  }
}
