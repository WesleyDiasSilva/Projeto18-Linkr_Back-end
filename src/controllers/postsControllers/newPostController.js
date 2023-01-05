import { servicePublishPost } from "../../services/posts/servicePublishPost.js";

export async function newPostController(req, res) {
  try {
    const { link, description } = req.body.post;
    const {user} = req.body;
    const {user_id} = user;
    const publish = await servicePublishPost(link, description, user_id);
    if(publish.status){
      return res.status(201).send(publish.message)
    }
    return res.status(404).send(publish.message)
  } catch (err) {
    return res.status(500).send(err);
  }
}
