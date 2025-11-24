import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { saveMessage } from '../controllers/messages.controller.js'; 

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

    socket.on('send_message', async (data) => {
      try {
        const { message } = data;

        const savedMessage = await saveMessage({
          content: message,
          userId: socket.userId
        });

        const messagePayload = {
          senderId: savedMessage.userId,
          senderName: savedMessage.username,
          message: savedMessage.content,
          timestamp: savedMessage.createdAt
        };

        io.emit('receive_message', messagePayload);

      } catch (error) {
        console.error('Error al enviar mensaje:', error);
        socket.emit('error', 'Error al enviar el mensaje');
      }
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.userId);
    });
  });

  return io;
};

export default socketHandler;
