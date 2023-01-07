import { createSession } from "../../repositories/sessions/createSession.js";
import { findSessionByUserId } from "../../repositories/sessions/findSessionByUserId.js";
import { updateSession } from "../../repositories/sessions/updateSession.js";

export async function serviceCreateSession(user_id, token) {
  try {
    const existsSession = await findSessionByUserId(user_id);
    if (existsSession.query[0]) {
      const sessionUpdated = await updateSession(user_id, token);
      if (sessionUpdated.status) {
        return { status: true, message: token };
      } else {
        return {
          status: false,
          message: "Unable to connect, please try again later!",
        };
      }
    }else{
      const createdSession = await createSession(user_id, token);
    if (createdSession.status) {
      return { status: true, message: token };
    }
    return {
      status: false,
      message: "Unable to connect, please try again later!",
    };
    }
  } catch (err){
    return { status: false, message: "error" };
  }
}
