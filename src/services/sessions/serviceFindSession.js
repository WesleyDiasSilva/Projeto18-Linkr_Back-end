import { findSession } from "../../repositories/sessions/findSession.js";
import { verifyToken } from "../../utils/jwt/verifyToken.js";

export async function serviceFindSession(token){
  try{
    const tokenValid = verifyToken(token);
    if(!tokenValid){
      return {status: false, message: 'Token Invalid!'}
    }
    const session = await findSession(token);
    if(!session.status){
      return {status: false, message: 'do log in!'}
    }
    return {status: true, message: session.query[0]}
  }catch{
    return {status: false, message: 'Token Invalid!'}
  }
}