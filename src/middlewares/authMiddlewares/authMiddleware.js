import { findSession } from "../../repositories/sessions/findSession.js";
import { verifyToken } from "../../utils/jwt/verifyToken.js";

export async function authMiddleware(req, res, next){
  try{
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const tokenValid = verifyToken(token);
    if(!tokenValid){
      return res.status(409).send("Token Invalid!")
    }
    const session = await findSession(token);
    if(!session.status){
      return res.status(409).send("Token Invalid!")
    }
    const user = {
      token,
      username: tokenValid.username,
      user_id: session?.query[0].user_id
    }
    req.body.user = user
    next()
  }catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}