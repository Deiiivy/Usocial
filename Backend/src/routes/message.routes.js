import express from 'express';
import * as messageController from '../controllers/messages.controller.js';
import { verifyToken } from '../middlewares/JWT.js';
const router = express.Router();

router.get('/', messageController.getAllMessages);
router.post('/createMessage', verifyToken, messageController.createMessage);

export default router;
