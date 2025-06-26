import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const createPost = async (post) => {
  return await prisma.posts.create({ data: post });
};

const getPostById = async (id) => {
  return await prisma.posts.findUnique({ where: { id } });
};

const getPostsByUserId = async (userId) => {
  return await prisma.posts.findMany({ where: { userId } });
};

const getAllPosts = async () => {
  return await prisma.posts.findMany();
};

const updatePost = async (id, post) => {
  return await prisma.posts.update({ where: { id }, data: post });
};

const deletePost = async (id) => {
  return await prisma.posts.delete({ where: { id } });
};

export default {
  createPost,
  getPostById,
  getAllPosts,
  updatePost,
  deletePost,
  getPostsByUserId
};
