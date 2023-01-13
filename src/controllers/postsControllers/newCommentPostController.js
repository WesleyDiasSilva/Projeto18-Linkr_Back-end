import { createComment } from "../../repositories/posts/createComment.js";

export async function newCommentPostController(req, res) {
  try {
    const { post_id, text } = req.body.post;
    const { user: {user_id} } = req.body;
    const publish = await createComment(post_id, user_id, text);
    if(publish.status){
      return res.status(201).send(publish.message)
    }
    return res.status(404).send(publish.message)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err);
  }
}
