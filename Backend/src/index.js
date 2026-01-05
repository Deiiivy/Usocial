import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import errorHandler from './middlewares/errorHandler.js';
import postRoutes from './routes/post.routes.js';
import messageRoutes from './routes/message.routes.js';
import friendRoutes from './routes/friends.routes.js';
import socketHandler from './utils/socket.js';
import path from 'path';
import userService from './services/user.service.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/messages', messageRoutes);
app.use('/friends', friendRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (_req, res) => {
  res.send('API Usocial funcionando correctamente');
});

app.use(errorHandler);

// userService.createAdminIfNotExist();

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

socketHandler(server);
