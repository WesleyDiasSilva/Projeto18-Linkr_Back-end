import { newCommentPost } from "../../models/posts/newCommentPost.js";

export function newCommentPostMiddleware(req, res, next){
    const {post_id, text} = req.body;
    const validation = newCommentPost.validate({post_id, text}, {abortEarly: false});
    if(validation.error){
        return res.status(400).send(validation.error)
    }
    req.body.post = {post_id, text};
    next()
}