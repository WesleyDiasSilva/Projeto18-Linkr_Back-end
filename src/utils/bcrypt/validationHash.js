import bcrypt from "bcrypt";

export async function validateHash(password, hash) {
  try {
    const validation = bcrypt.compareSync(password, hash);
    return validation;
  } catch {
    return false;
  }
}
