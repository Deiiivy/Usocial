import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const saveMessage = async ({ content, userId, receiverId }) => {
    const message = await prisma.messages.create({
        data: {
            content,
            userId,
            receiverId
        },
        include: {
            user: {
                select: { name: true }
            },
            receiver: {
                select: { name: true }
            }
        }
    });

    return {
        id: message.id,
        content: message.content,
        createdAt: message.createdAt,
        userId: message.userId,
        receiverId: message.receiverId,
        username: message.user.name,
        receiverName: message.receiver.name
    };
};


export const getGlobalMessages = async (req, res, next) => {
    try {
        const messages = await prisma.messages.findMany({
            where: {
                receiverId: null // Solo mensajes globales
            },
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

export const getMessagesWithFriend = async (req, res, next) => {
    try {
        const { friendId } = req.params;
        const userId = req.userId;

        const messages = await prisma.messages.findMany({
            where: {
                OR: [
                    { userId: userId, receiverId: parseInt(friendId) },
                    { userId: parseInt(friendId), receiverId: userId }
                ]
            },
            orderBy: {
                createdAt: 'asc'
            },
            include: {
                user: {
                    select: { name: true }
                },
                receiver: {
                    select: { name: true }
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
        const { content, receiverId } = req.body;
        const savedMessage = await saveMessage({ content, userId: req.userId, receiverId });
        res.json(savedMessage);
    } catch (error) {
        next(error);
    }
};
