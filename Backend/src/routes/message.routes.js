import express from 'express';
import * as messageController from '../controllers/messages.controller.js';
import { verifyToken } from '../middlewares/JWT.js';
const router = express.Router();

router.get('/', messageController.getGlobalMessages);
router.get('/friend/:friendId', verifyToken, messageController.getMessagesWithFriend);
router.post('/createMessage', verifyToken, messageController.createMessage);

export default router;
