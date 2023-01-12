import {Router} from 'express';
import { getPostsController } from '../controllers/postsControllers/getPostsController.js';
import { lastLikesPostController } from '../controllers/postsControllers/lastLikesPostController.js';
import deletePostController from '../controllers/postsControllers/deletePostController.js';
import { newPostController } from '../controllers/postsControllers/newPostController.js';
import { authMiddleware } from '../middlewares/authMiddlewares/authMiddleware.js';
import {newPostMiddleware} from '../middlewares/postsMiddlewares/newPostMiddleware.js';

import { likePostMiddleware } from '../middlewares/postsMiddlewares/likePostMiddleware.js';
import { likePostController } from '../controllers/postsControllers/likePostController.js';

import { getAllHashtags } from "../controllers/postsControllers/getAllHashtags.js";
import { userPostsController } from '../controllers/postsControllers/userPostsController.js';
import { trendingsController } from '../controllers/postsControllers/trendingsController.js';

const route = Router();

route.post('/post', newPostMiddleware, authMiddleware, newPostController)
route.get('/posts', authMiddleware, getPostsController)
route.post('/like', likePostMiddleware, likePostController)
route.get('/hashtag', getAllHashtags)
route.get('/hashtag/:hashtag', trendingsController)
route.get('/likes-post/:id', authMiddleware, lastLikesPostController)
route.delete('/delete-post/:postId', deletePostController)

route.get('/user/:id', userPostsController)

export default route;