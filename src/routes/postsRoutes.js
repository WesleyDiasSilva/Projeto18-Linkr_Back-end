import {Router} from 'express';
import { getPostsController } from '../controllers/postsControllers/getPostsController.js';
import { lastLikesPostController } from '../controllers/postsControllers/lastLikesPostController.js';
import { newPostController } from '../controllers/postsControllers/newPostController.js';
import { authMiddleware } from '../middlewares/authMiddlewares/authMiddleware.js';
import {newPostMiddleware} from '../middlewares/postsMiddlewares/newPostMiddleware.js'

const route = Router();

route.post('/post', newPostMiddleware, authMiddleware, newPostController)
route.get('/posts', authMiddleware, getPostsController)
route.get('/likes-post/:id', authMiddleware, lastLikesPostController)

export default route;