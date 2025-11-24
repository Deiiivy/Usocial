import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllUsers = async () => await prisma.users.findMany();
const createUser = async (userData) => await prisma.users.create({ data: userData });
const getUserById = async (id) => await prisma.users.findUnique({ where: { id } });
const getUserByEmail = async (email) => await prisma.users.findUnique({ where: { email } });

const deleteUser = async (id) => {
  const user = await prisma.users.delete({
    where: { id: Number(id) }
  });
  return user;
};

const createAdminIfNotExist = async () => {
  const admin = await getUserByEmail("admin@example.com");
  if (!admin) {
    const hashedPassword = await bcrypt.hash("123", 10);
    await createUser({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN"
    });
    console.log("Usuario ADMIN creado: admin@example.com / 123");
  }
};

export default {
  getAllUsers,
  createUser,
  getUserById,
  getUserByEmail,
  createAdminIfNotExist, 
  deleteUser
};

