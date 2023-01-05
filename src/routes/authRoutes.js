import { Router } from "express";
import { loginController } from "../controllers/authControllers/loginController.js";
import { loginMiddleware } from "../middlewares/authMiddlewares/loginMiddleware.js";
import { signUpMiddleware } from "../middlewares/authMiddlewares/signUpMiddleware.js"; 
import { postSignUp } from "../controllers/authControllers/signUpController.js";
import { logoutController } from "../controllers/authControllers/logoutController.js";
import { verifySessionController } from "../controllers/authControllers/verifySessionController.js";

const route = Router();

route.post("/session", verifySessionController);

route.post("/sign-in", loginMiddleware, loginController);

route.post("/sign-up", signUpMiddleware, postSignUp);

route.post("/logout", logoutController);

export default route;
