import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export default getAllUsers