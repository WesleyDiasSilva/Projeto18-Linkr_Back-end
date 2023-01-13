import {Router} from 'express';
import { getPostsController } from '../controllers/postsControllers/getPostsController.js';
import { lastLikesPostController } from '../controllers/postsControllers/lastLikesPostController.js';
import deletePostController from '../controllers/postsControllers/deletePostController.js';
import { newPostController } from '../controllers/postsControllers/newPostController.js';
import { authMiddleware } from '../middlewares/authMiddlewares/authMiddleware.js';
import {newPostMiddleware} from '../middlewares/postsMiddlewares/newPostMiddleware.js';

import { likePostMiddleware } from '../middlewares/postsMiddlewares/likePostMiddleware.js';
import { likePostController } from '../controllers/postsControllers/likePostController.js';
import { searchUser } from '../controllers/postsControllers/searchUserController.js';

import { getAllHashtags } from "../controllers/postsControllers/getAllHashtags.js";
import { userPostsController } from '../controllers/postsControllers/userPostsController.js';
import { trendingsController } from '../controllers/postsControllers/trendingsController.js';

import { editPostMiddleware } from "../middlewares/postsMiddlewares/editPostMiddleware.js";
import { editPostController } from "../controllers/postsControllers/editPostController.js";
import { newCommentPostMiddleware } from '../middlewares/postsMiddlewares/newCommentPostMiddleware.js';
import { newCommentPostController } from '../controllers/postsControllers/newCommentPostController.js';
import { getPostsCommentsController } from '../controllers/postsControllers/getPostsCommentsController.js';
import repostPostController from '../controllers/postsControllers/repostPostController.js';
import { getDataInfosControllers } from '../controllers/postsControllers/getDataInfosControllers.js';

const route = Router();

route.post('/post', newPostMiddleware, authMiddleware, newPostController)
route.get('/posts', authMiddleware, getPostsController)
route.post('/like', likePostMiddleware, likePostController)
route.get('/hashtag', getAllHashtags)
route.get('/hashtag/:hashtag', authMiddleware, trendingsController)
route.get('/likes-post/:id', authMiddleware, lastLikesPostController)
route.post('/delete-post/:postId', authMiddleware, deletePostController)
route.post('/user', authMiddleware, searchUser)
route.get('/user/:id', authMiddleware, userPostsController)
route.post('/comment', authMiddleware, newCommentPostMiddleware, newCommentPostController);
route.post('/edit', editPostMiddleware, editPostController);
route.get('/comments', getPostsCommentsController);
route.post('/repost/:postId', authMiddleware, repostPostController )
route.get('/datainfos/:id', authMiddleware, getDataInfosControllers)
export default route;