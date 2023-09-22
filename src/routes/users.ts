import { Router } from "express";
import UserController from "../controllers/users";

export const UsersRoutes = Router();

UsersRoutes.post('/create', UserController.create)
UsersRoutes.put('/update/:id', UserController.update)
UsersRoutes.get('/list/all', UserController.getAll)
UsersRoutes.get('/list/byId/:id', UserController.getById)