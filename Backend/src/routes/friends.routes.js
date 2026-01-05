import express from 'express';
import * as friendController from '../controllers/friend.controller.js';
import { verifyToken } from '../middlewares/JWT.js';
const router = express.Router();

router.get('/', verifyToken, friendController.getFriends);
router.get('/search', verifyToken, friendController.searchUsersController);
router.post('/request', verifyToken, friendController.sendFriendRequestController);
router.post('/accept', verifyToken, friendController.acceptFriendRequestController);
router.get('/pending', verifyToken, friendController.getPendingRequestsController);

export default router;