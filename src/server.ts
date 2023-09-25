import express from 'express';
import cors from 'cors';
import { UsersRoutes } from './routes/users';
import UserController from "./controllers/users";
import { checkTokenMiddleware } from './middlewares/checkAuth/checkToken';

const app = express();

app.use(cors())
app.use(express.json())

app.post('/users/create', UserController.create);
app.post('/users/auth', UserController.auth);

app.use(checkTokenMiddleware);

app.use('/users', UsersRoutes);

app.listen(4001, () => console.log('Api rodando a todo vapor! http://localhost:4001'));