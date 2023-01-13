import { editPost } from "../../models/posts/editPost.js";

export async function editPostMiddleware(req, res, next){
  try{
    const {post_id, description} = req.body;

    const verify = editPost.validate({post_id, description}, {abortEarly: false});

    if (verify.error) {
        return res.status(400).send(verify.error);
    }

    res.locals.data = {post_id, description};
    next()
  }catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}