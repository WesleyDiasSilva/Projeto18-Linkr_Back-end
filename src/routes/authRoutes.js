import { Router } from "express";
import { loginController } from "../controllers/authControllers/loginController.js";
import { loginMiddleware } from "../middlewares/authMiddlewares/loginMiddleware.js";
import { signUpMiddleware } from "../middlewares/authMiddlewares/signUpMiddleware.js"; 
import { postSignUp } from "../controllers/authControllers/signUpController.js";

const route = Router();

route.post("/sign-in", loginMiddleware, loginController);

route.post("/sign-up", signUpMiddleware, postSignUp);

export default route;
