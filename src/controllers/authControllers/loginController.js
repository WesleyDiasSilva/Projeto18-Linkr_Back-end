import { serviceLogin } from "../../services/servicesAuth/serviceLogin.js";

export async function loginController(req, res) {
  try {
    const { email, password } = req.body.user;
    const response = await serviceLogin(email, password);
    if (!response.status) {
      return res.status(400).send(response.message);
    }
    return res.status(200).send(response.message);
  } catch (err) {
    return res.status(500).send(err);
  }
}
