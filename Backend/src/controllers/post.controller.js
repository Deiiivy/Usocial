import postService from '../services/post.service.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPost = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;
    console.log('userId:', userId, typeof userId);
    const post = await postService.createPost({ title, content, image: req.file ? `uploads/${req.file.filename}` : null
        ,  userId: parseInt(userId) });
    res.status(201).json(post );
    console.log('req.file:', req.file);
console.log('req.body:', req.body);

  } catch (error) {
    next(error);
  }
};


export const getPostById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const post = await postService.getPostById(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.posts.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        image: true,
        createdAt: true,
        userId: true,
        user: {
          select: {
            name: true
          }
        }
      }
    });
    res.json(posts);
    console.log(posts);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const post = await postService.updatePost(id, { title, content });
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const post = await postService.deletePost(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const getPostsByUserId = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const posts = await postService.getPostsByUserId(userId);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

