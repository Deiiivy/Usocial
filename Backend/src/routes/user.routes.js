import express from 'express';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/RegisterUser', userController.createUser)
router.post('/LoginUser', userController.loginUSer);

export default router;
