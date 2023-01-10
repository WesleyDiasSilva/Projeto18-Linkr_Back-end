import { createPost } from "../../repositories/posts/createPost.js";
import { createHashtag } from "../../repositories/posts/createHashtag.js";
import findHashtag from "find-hashtags";

export async function servicePublishPost(link, description, user_id){
  try{
    const hashtagList = findHashtag(description);
    const resultPublish = await createPost(link, description, user_id);
    await createHashtag(resultPublish.query, hashtagList);
    if(resultPublish.status){
      return {status: true, message: 'OK'}
    }
    return {status: false, message: 'Error'}
  }catch{
    return {status: false, message: 'Error'}
  }
}