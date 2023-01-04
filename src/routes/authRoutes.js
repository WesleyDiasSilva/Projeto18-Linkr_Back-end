import { Router } from "express";
import { loginController } from "../controllers/authControllers/loginController.js";
import { loginMiddleware } from "../middlewares/authMiddlewares/loginMiddleware.js";

const route = Router();

route.post("/sign-in", loginMiddleware, loginController);

export default route;
