import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import errorHandler from './middlewares/errorHandler.js';
import postRoutes from './routes/post.routes.js';
import socketHandler from './utils/socket.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (_req, res) => {
  res.send('API Usocial funcionando correctamente');
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


const io = socketHandler(server);


export { io };
