import { Controller } from "../abstract";
import { User } from "@prisma/client"
import UserService from '../../services/users'
import { Request, Response } from "express";
import { errorMessages } from "../../utils/messages/errors";

class UserController extends Controller<User> {
    constructor(service: any) {
        super(service)
    }

    public async create(req: Request, res: Response) {
        try {
            const dto: Omit<User, 'id' | 'createdAt'> = req.body,
                existentUser: User = await UserService.getBy({ where: { username: dto.username } });

            if (existentUser) {
                return res.status(409).send(errorMessages[409]);
            }

            const response = await UserService.create<Omit<User, 'id' | 'createdAt'>>(dto);

            return res.json(response);
        } catch (err) {
            return res.status(500).send(errorMessages[500]);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params,
                dto: User = req.body,
                existentObj = await UserService.getBy({ where: { id: Number(id) } });

            if (!existentObj) return res.status(404).send(errorMessages[404]);

            const response = await UserService.update({ id: Number(id) }, dto);

            return res.send(response)

        } catch (error) {
            return res.status(500).send(errorMessages[500]);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const response: User[] = await UserService.getAll();
            if (!response.length) return res.status(404).send(errorMessages[404])
            return res.json(response);
        } catch (err) {
            return res.status(500).send(errorMessages[500]);
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const { id } = req.params,
                response = await UserService.getBy({ where: { id: Number(id) } });

            if (!response) return res.status(404).send(errorMessages[404])

            return res.json(response);
        } catch (err) {
            console.log(err)
            return res.status(500).send(errorMessages[500]);
        }
    }


}

export default new UserController(UserService);