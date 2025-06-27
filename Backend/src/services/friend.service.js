import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllFriends = async() => {
    return await prisma
}