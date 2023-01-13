import { getDataInfos } from "../../repositories/posts/getDataInfos.js";

export async function getDataInfosControllers(req, res){
  try{
    const { id } = req.params;
    const { user } = req.body;

    const lastLikes = await getDataInfos(id)
    lastLikes.query.user_id = user.user_id;
    if(lastLikes.status){
      return res.status(200).send(lastLikes.query)
    }
    return res.status(400).send(lastLikes.query)
  }catch (err) {
    return res.status(500).send(err)
  }
}