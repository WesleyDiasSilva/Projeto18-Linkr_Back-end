import { findUserByEmail } from "../../repositories/users/findUserByEmail.js";
import { validateHash } from "../../utils/bcrypt/validationHash.js";
import { createToken } from "../../utils/jwt/createToken.js";
import { serviceCreateSession } from "../sessions/serviceCreateSession.js";

export async function serviceLogin(email, passwordUser) {
  try {
    const foundUser = await findUserByEmail(email);
    if (!foundUser.status) {
      
      return {
        status: false,
        message: "Unable to connect, please try again later!"
      };
    }
    if (!foundUser.query[0]) {
      
      return { status: false, message: "Email not found!" };
    }
    const { username, picture_url, password, id } = foundUser.query[0];
    const validation = await validateHash(passwordUser, password);
    if (!validation) {
      
      return { status: false, message: "Password incorrect!" };
    }
    
    const token = createToken({ username, picture_url });
    console.log("oi")
    const createdSession = await serviceCreateSession(id, token)
    
    if (!createdSession.status) {
      
      return { status: false, message: createdSession.message }
    }
    return { status: true, message: token };
  } catch (err) {
    console.log(err)
    return { status: false, message: err };
  }
}
