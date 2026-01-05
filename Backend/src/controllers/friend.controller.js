import { getFriendsByUserId, searchUsers, sendFriendRequest, acceptFriendRequest, getPendingRequests } from '../services/friend.service.js';

export const getFriends = async (req, res, next) => {
    try {
        const userId = req.userId;
        const friends = await getFriendsByUserId(userId);
        res.json(friends);
    } catch (error) {
        next(error);
    }
};

export const searchUsersController = async (req, res, next) => {
    try {
        const { query } = req.query;
        const userId = req.userId;
        const users = await searchUsers(query, userId);
        res.json(users);
    } catch (error) {
        next(error);
    }
};

export const sendFriendRequestController = async (req, res, next) => {
    try {
        const { targetId } = req.body;
        const requesterId = req.userId;
        const request = await sendFriendRequest(requesterId, parseInt(targetId));
        res.json(request);
    } catch (error) {
        next(error);
    }
};

export const acceptFriendRequestController = async (req, res, next) => {
    try {
        const { requesterId } = req.body;
        const userId = req.userId;
        await acceptFriendRequest(userId, parseInt(requesterId));
        res.json({ message: 'Friend request accepted' });
    } catch (error) {
        next(error);
    }
};

export const getPendingRequestsController = async (req, res, next) => {
    try {
        const userId = req.userId;
        const requests = await getPendingRequests(userId);
        res.json(requests);
    } catch (error) {
        next(error);
    }
};