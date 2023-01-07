import {Router} from 'express';
import { getPostsController } from '../controllers/postsControllers/getPostsController.js';
import { lastLikesPostController } from '../controllers/postsControllers/lastLikesPostController.js';
import deletePostController from '../controllers/postsControllers/deletePostController.js';
import { newPostController } from '../controllers/postsControllers/newPostController.js';
import { authMiddleware } from '../middlewares/authMiddlewares/authMiddleware.js';
import {newPostMiddleware} from '../middlewares/postsMiddlewares/newPostMiddleware.js';



const route = Router();

route.post('/post', newPostMiddleware, authMiddleware, newPostController)
route.get('/posts', authMiddleware, getPostsController)
route.get('/likes-post/:id', authMiddleware, lastLikesPostController)
route.delete('/delete-post/:postId', deletePostController)

export default route;