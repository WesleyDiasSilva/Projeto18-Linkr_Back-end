import { newPost } from "../../models/posts/newPost.js";

export function newPostMiddleware(req, res, next){
  const {link, description} = req.body;
  const validation = newPost.validate({link, description}, {abortEarly: false});
  if(validation.error){
    return res.status(400).send(validation.error)
  }
  req.body.post = {link, description};
  next()
}