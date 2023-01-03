import { modelLogin } from "../../models/authModels/loginModel.js";

export function loginMiddleware(req, res, next) {
  const { email, password } = req.body;

  const validation = modelLogin.validate(
    { email, password },
    { abortEarly: false }
  );

  if (validation.error) {
    return res.status(400).send(validation.error);
  }
  req.body.user = { email, password };
  next();
}
