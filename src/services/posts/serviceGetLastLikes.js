import { findLastLikes } from "../../repositories/posts/findLastLikes.js"
import { findPost } from "../../repositories/posts/findPost.js"

export async function serviceGetLastLikes(id){
  try{
    const foundPost = await findPost(id)
    if(!foundPost.status || foundPost.query.length == 0){
      return {status: false, message: 'Post not found!'}
    }
    const likes = await findLastLikes(id)
    if(likes.status){
      return {status: true, message: likes.query}
    }
    return {status: false, message: 'Try again!'}
  }catch (err) {
    console.log(err)
    return {status: false, message: null}
  }
}