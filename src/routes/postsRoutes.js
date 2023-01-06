import {Router} from 'express';
import deletePostController from '../controllers/postsControllers/deletePostController.js';
import { newPostController } from '../controllers/postsControllers/newPostController.js';
import { authMiddleware } from '../middlewares/authMiddlewares/authMiddleware.js';
import {newPostMiddleware} from '../middlewares/postsMiddlewares/newPostMiddleware.js';



const route = Router();

route.post('/post', newPostMiddleware, authMiddleware, newPostController)

route.delete('/delete-post/:postId', deletePostController)

export default route;