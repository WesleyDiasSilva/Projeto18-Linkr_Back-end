import jwt from "jsonwebtoken";

export function createToken(data) {
  const secret = process.env.JWT_PASS;
  const sevenDays = 60 * 60 * 24 * 30;
  const config = { expiresIn: sevenDays };
  const token = jwt.sign(data, secret ?? "", config);
  return token;
}
