import { doLikePost } from "../../repositories/posts/doLikePost.js";

export async function likePostController(req, res){   
  try {
    const {post_id, user_id} = res.locals.data;
    doLikePost(post_id, user_id);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(404);
  }  
}