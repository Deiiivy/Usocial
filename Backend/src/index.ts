import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.send('API Usocial funcionando'));

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

