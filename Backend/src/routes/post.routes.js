import express from 'express';
import * as postController from '../controllers/post.controller.js';
import { verifyToken } from '../middlewares/JWT.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); 
      const name = Date.now() + '-' + Math.round(Math.random() * 1E9); 
      cb(null, name + ext);
    }
  });
  
  const upload = multer({ storage });

const router = express.Router();

router.post('/CreatePost', verifyToken, upload.single('image'), postController.createPost);
router.get('/GetPostById/:id', verifyToken, postController.getPostById);
router.get('/GetAllPosts', verifyToken, postController.getAllPosts);
router.put('/UpdatePost/:id', verifyToken, postController.updatePost);
router.delete('/DeletePost/:id', verifyToken, postController.deletePost);
router.get('/GetPostsByUserId/:userId', verifyToken, postController.getPostsByUserId);

export default router;