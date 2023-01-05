import jwt from 'jsonwebtoken';

export function verifyToken(token){
  try{
    const data = jwt.verify(token, process.env.JWT_PASS);
    return data;
  }catch{
    return false;
  }
}