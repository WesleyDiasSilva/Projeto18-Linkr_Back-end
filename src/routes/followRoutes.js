import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddlewares/authMiddleware.js';
import { getFollowsRelationship } from "../controllers/followsControllers/getFollowsRelationship.js";

const route = Router();

route.get('/relationship/:userPageId', authMiddleware, getFollowsRelationship);
// route.post('/follow/:userPageId', authMiddleware, followUserController);
// route.post('/unfollow/:userPageId', authMiddleware, unfollowAnUser);

export default route;