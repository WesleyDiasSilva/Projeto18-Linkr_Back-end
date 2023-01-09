import urlMetadata from "url-metadata";
import { getPosts } from "../../repositories/posts/getPosts.js";

export async function serviceGetPosts(page) {
  if (page < 1)
    return { status: false, message: "Page must be bigger that 0!" };
  try {
    const { query, status } = await getPosts(page);
    if (!status) {
      return { status: false, message: "Error" };
    }
    const postsMetaData = await Promise.all(
      query.map(async (post) => {
        try {
          const {description, image, title} = (await urlMetadata(post.link));
          return { ...post, descriptionLink: description, imageLink: image, titleLink: title };
        } catch {
          try {
            const {description, title} = (await urlMetadata(post.link));
            return { ...post, descriptionLink: description, titleLink:title };
          } catch {
            try{
              const {description, title} = (await urlMetadata(post.link));
              return {...post, titleLink:title }
            } catch(error){
              console.log('urlMetadata error', error)
              return{ ...post, descriptionLink: error, titleLink: error };
            }
          }
        }
      })
    );      
    return { status: true, message: postsMetaData };
  } catch (err) {
    
    return { status: false, message: err };
  }
}
