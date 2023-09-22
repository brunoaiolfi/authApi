import express from 'express';
import cors from 'cors';
import { UsersRoutes } from './routes/users';

const app = express();

app.use(cors())
app.use(express.json())

app.use('/users', UsersRoutes);

app.listen(4001, () => console.log('Api rodando a todo vapor! http://localhost:4001'));