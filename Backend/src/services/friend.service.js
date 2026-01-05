import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getFriendsByUserId = async (userId) => {
    const friendships = await prisma.friends.findMany({
        where: {
            OR: [
                { userId: userId, status: "accepted" },
                { friendId: userId, status: "accepted" }
            ]
        },
        include: {
            user: {
                select: { id: true, name: true, email: true }
            },
            friend: {
                select: { id: true, name: true, email: true }
            }
        }
    });

    const friends = friendships.map(f => {
        if (f.userId === userId) {
            return f.friend;
        } else {
            return f.user;
        }
    });

    return friends;
};

export const searchUsers = async (query, currentUserId) => {
    return await prisma.users.findMany({
        where: {
            AND: [
                { id: { not: currentUserId } },
                {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        { email: { contains: query, mode: 'insensitive' } }
                    ]
                }
            ]
        },
        select: {
            id: true,
            name: true,
            email: true
        },
        take: 10
    });
};

export const sendFriendRequest = async (requesterId, targetId) => {
    // Check if request already exists
    const existing = await prisma.friends.findFirst({
        where: {
            OR: [
                { userId: requesterId, friendId: targetId },
                { userId: targetId, friendId: requesterId }
            ]
        }
    });

    if (existing) {
        throw new Error('Friend request already exists');
    }

    return await prisma.friends.create({
        data: {
            userId: requesterId,
            friendId: targetId,
            status: 'pending'
        }
    });
};

export const acceptFriendRequest = async (userId, requesterId) => {
    return await prisma.friends.updateMany({
        where: {
            userId: requesterId,
            friendId: userId,
            status: 'pending'
        },
        data: {
            status: 'accepted'
        }
    });
};

export const getPendingRequests = async (userId) => {
    return await prisma.friends.findMany({
        where: {
            friendId: userId,
            status: 'pending'
        },
        include: {
            user: {
                select: { id: true, name: true, email: true }
            }
        }
    });
};