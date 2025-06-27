import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllMessages = async (req, res, next) => {
    try {
        const messages = await prisma.messages.findMany({
            select: {
                id: true,
                content: true,
                createdAt: true,
                userId: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });
        res.json(messages);
    } catch (error) {
        next(error);
    }
};

export const createMessage = async (req, res, next) => {
    try {
        const { content } = req.body;
        const message = await prisma.messages.create({
            data: {
                content,
                userId: req.userId
            }
        });
        res.json(message);
    } catch (error) {
        next(error);
    }
};

