import { createPost } from "../../repositories/posts/createPost.js";
import { serviceFindSession } from "../sessions/serviceFindSession.js";

export async function servicePublishPost(link, description, user_id){
  try{
    const resultPublish = await createPost(link, description, user_id)
    if(resultPublish.status){
      return {status: true, message: 'OK'}
    }
    return {status: false, message: 'Error'}
  }catch{
    return {status: false, message: 'Error'}
  }
}