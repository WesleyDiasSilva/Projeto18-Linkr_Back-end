import { verifyToken } from "../../utils/jwt/verifyToken.js";
import { likePost } from "../../models/posts/likePost.js";


export async function likePostMiddleware(req, res, next){   
    try {
        const {authorization} = req.headers;
        const {post_id, user_id} = req.body;

        const token = authorization?.replace("Bearer ", "");

        const tokenVerification = verifyToken(token);

        if(!tokenVerification){
            return res.status(400).send("Invalid Token");
        }

        const validation = likePost.validate({post_id, user_id}, {abortEarly: false});
        if(validation.error){
            return res.status(400).send(validation.error)
        }

        res.locals.data = {post_id, user_id};
        next();
    } catch (error) {
        console.error(error);
        res.sendStatus(400);
    }
}