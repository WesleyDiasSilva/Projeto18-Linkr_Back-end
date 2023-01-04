import bcrypt from "bcrypt";

export async function createHashPassword(password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}
