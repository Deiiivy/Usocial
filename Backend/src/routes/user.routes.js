import express from 'express';
import * as userController from '../controllers/user.controller.js';
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

router.get('/', userController.getUsers);
router.post('/RegisterUser', upload.single('image'), userController.createUser)
router.post('/LoginUser', userController.loginUSer);
router.get('/me', verifyToken, userController.getCurrentUser);


export default router;
