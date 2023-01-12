import { serviceGetPosts } from "../../services/posts/serviceGetPosts.js";

export async function getPostsController(req, res) {
  try {
    const { page, trending } = req.query;
    if(isNaN(page)) return res.status(409).send("Query 'page must be a number!'")
    const posts = await serviceGetPosts(Number(page), trending)
    if(posts.status){
      return res.status(200).send(posts.message)
    }
    return res.status(400).send(posts.message)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err);
  }
}
