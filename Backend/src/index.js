import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/users', userRoutes);


app.get('/', (_req, res) => {
  res.send('API Usocial funcionando correctamente');
});


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
