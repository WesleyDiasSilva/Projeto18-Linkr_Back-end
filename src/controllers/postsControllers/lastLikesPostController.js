import { serviceGetLastLikes } from "../../services/posts/serviceGetLastLikes.js";

export async function lastLikesPostController(req, res){
  try{
    const {id} = req.params;
    const lastLikes = await serviceGetLastLikes(id)
    if(lastLikes.status){
      return res.status(200).send(lastLikes.message)
    }
    return res.status(400).send(lastLikes.message)
  }catch (err) {
    return res.status(500).send(err)
  }
}