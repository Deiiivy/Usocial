import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const saveMessage = async ({ content, userId }) => {
    const message = await prisma.messages.create({
        data: {
            content,
            userId
        },
        include: {
            user: {
                select: { name: true }
            }
        }
    });

    return {
        id: message.id,
        content: message.content,
        createdAt: message.createdAt,
        userId: message.userId,
        username: message.user.name
    };
};


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
        const savedMessage = await saveMessage({ content, userId: req.userId });
        res.json(savedMessage);
    } catch (error) {
        next(error);
    }
};
