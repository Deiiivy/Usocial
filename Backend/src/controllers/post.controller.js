import postService from '../services/post.service.js';

export const createPost = async (req, res, next) => {
  try {
    const { title, content, userId } = req.body;
    const post = await postService.createPost({ title, content, userId });
    res.status(201).json(post);
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
    const posts = await postService.getAllPosts();
    res.json(posts);
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
