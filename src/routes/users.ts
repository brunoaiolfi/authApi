import { Router } from "express";
import UserController from "../controllers/users";

export const UsersRoutes = Router();

UsersRoutes.post('/', UserController.create)