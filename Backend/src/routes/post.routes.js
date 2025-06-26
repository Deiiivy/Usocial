import express from 'express';
import * as postController from '../controllers/post.controller.js';
import { verifyToken } from '../middlewares/JWT.js';

const router = express.Router();

router.post('/CreatePost', verifyToken, postController.createPost);
router.get('/GetPostById/:id', verifyToken, postController.getPostById);
router.get('/GetAllPosts', verifyToken, postController.getAllPosts);
router.put('/UpdatePost/:id', verifyToken, postController.updatePost);
router.delete('/DeletePost/:id', verifyToken, postController.deletePost);

export default router;