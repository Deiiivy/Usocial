import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { saveMessage } from '../controllers/messages.controller.js'; 

const userSockets = new Map(); // userId -> socketId

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      socket.userId = decoded.userId;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.userId);
    userSockets.set(socket.userId, socket.id);

    socket.on('send_message', async (data) => {
      try {
        const { message, receiverId } = data;

        const savedMessage = await saveMessage({
          content: message,
          userId: socket.userId,
          receiverId
        });

        const messagePayload = {
          senderId: savedMessage.userId,
          senderName: savedMessage.username,
          receiverId: savedMessage.receiverId,
          receiverName: savedMessage.receiverName,
          message: savedMessage.content,
          timestamp: savedMessage.createdAt
        };

        // Emitir al sender y receiver
        const senderSocketId = userSockets.get(socket.userId);
        const receiverSocketId = userSockets.get(receiverId);
        if (senderSocketId) io.to(senderSocketId).emit('receive_message', messagePayload);
        if (receiverSocketId) io.to(receiverSocketId).emit('receive_message', messagePayload);

      } catch (error) {
        console.error('Error al enviar mensaje:', error);
        socket.emit('error', 'Error al enviar el mensaje');
      }
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.userId);
      userSockets.delete(socket.userId);
    });
  });

  return io;
};

export default socketHandler;
