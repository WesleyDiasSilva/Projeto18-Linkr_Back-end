import {Router} from 'express';
import { newPostController } from '../controllers/postsControllers/newPostController.js';
import { authMiddleware } from '../middlewares/authMiddlewares/authMiddleware.js';
import {newPostMiddleware} from '../middlewares/postsMiddlewares/newPostMiddleware.js'

const route = Router();

route.post('/post', newPostMiddleware, authMiddleware, newPostController)

export default route;