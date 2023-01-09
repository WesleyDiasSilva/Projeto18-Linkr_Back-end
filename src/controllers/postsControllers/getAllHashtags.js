import { getHashtags } from "../../repositories/posts/getHashtags.js";

export async function getAllHashtags(req, res){   
  try {
    const query = await getHashtags();
    res.status(201).send(query.query);
  } catch (error) {
    res.sendStatus(404);
  }  
}