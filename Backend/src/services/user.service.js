import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllUsers = async () => {
  return await prisma.users.findMany();
};

const createUser = async (userData) => {
  return await prisma.users.create({
    data: userData,
  });
};

const getUserByEmail = async (email) => {
  return await prisma.users.findUnique({
    where: { email }, 
  });
};

export default {
  getAllUsers,
  createUser,
  getUserByEmail,
};
