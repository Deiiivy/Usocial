import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import userService from '../services/user.service.js';

const socketHandler = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    const users = new Map();

    
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
        
       
        users.set(socket.userId, socket);

        
        socket.on('send_message', async (data) => {
            try {
                const { recipientId, message } = data;
                const recipientSocket = users.get(recipientId);
                
                if (recipientSocket) {
                    recipientSocket.emit('receive_message', {
                        senderId: socket.userId,
                        message,
                        timestamp: new Date().toISOString()
                    });
                }
            } catch (error) {
                console.error('Error al enviar mensaje:', error);
                socket.emit('error', 'Error al enviar el mensaje');
            }
        });

        
        socket.on('disconnect', () => {
            console.log('Usuario desconectado:', socket.userId);
            users.delete(socket.userId);
        });
    });

    return io;
};

export default socketHandler;
