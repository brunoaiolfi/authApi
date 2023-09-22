import { Controller } from "../abstract";
import { User } from "@prisma/client"
import UserService from '../../services/users' 
import { Request, Response } from "express";

class UserController extends Controller<User> {
    constructor(service: any) {
        super(service)
    }

    async create(req: Request, res: Response) {
        try {
            const dto: Omit<User, 'id' | 'createdAt'> = req.body,
                existentUser = await UserService.getOne({ where: {username: dto.username} }),
                response = await UserService.create<Omit<User, 'id' | 'createdAt'>>(dto);

            return res.json(response);
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

export default new UserController(UserService);