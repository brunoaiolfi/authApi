import { Router } from "express";
import UserController from "../controllers/users";

export const UsersRoutes = Router();

UsersRoutes.put('/update/:id', UserController.update)
UsersRoutes.get('/list/all', UserController.getAll)
UsersRoutes.get('/list/byId/:id', UserController.getById)
UsersRoutes.get('/list/byName/:name', UserController.getByName)
UsersRoutes.delete('/delete/byId/:id', UserController.delete)
