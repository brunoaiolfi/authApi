import { Controller } from "../abstract";
import { User } from "@prisma/client"
import UserService from '../../services/users'
import { Request, Response } from "express";
import { errorMessages } from "../../utils/messages/errors";
import { generateHash } from "../../utils/password/generateHash";
import { generateToken } from "../../utils/token/generateToken";

class UserController extends Controller<User> {
    constructor(service: any) {
        super(service)
    }

    public async auth(req: Request, res: Response) {
        try {
            const { username, password } = req.body,
                hashedPassword = generateHash(password),
                existentUser: User = await UserService.getBy({
                    AND: [
                        {username},
                        {password: hashedPassword}
                    ]
                });

            if (!existentUser) {
                return res.status(404).send(errorMessages[404]);
            }

            const token = generateToken({ ...existentUser }),
                response = { ...existentUser, password: '', token };

            return res.json(response);
        } catch (err) {
            console.log(err)
            return res.status(500).send(errorMessages[500]);
        }
    }


    public async create(req: Request, res: Response) {
        try {
            const { password, username, ...rest }: Omit<User, 'id' | 'createdAt'> = req.body,
                hashedPassword = generateHash(password),
                existentUser: User = await UserService.getBy({ username: username });

            if (existentUser) {
                return res.status(409).send(errorMessages[409]);
            }

            const response = await UserService.create<Omit<User, 'id' | 'createdAt'>>({ ...rest, password: hashedPassword, username });

            return res.json({ ...response, password: '' });
        } catch (err) {
            return res.status(500).send(errorMessages[500]);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params,
                { password, ...rest }: User = req.body,
                hashedPassword = generateHash(password),
                existentObj = await UserService.getBy({ id: Number(id) });

            if (!existentObj) return res.status(404).send(errorMessages[404]);

            const response = await UserService.update({ id: Number(id) }, { ...rest, password: hashedPassword });

            return res.json({ ...response, password: '' });

        } catch (error) {
            return res.status(500).send(errorMessages[500]);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const response: User[] = await UserService.getAll();
            if (!response.length) return res.status(404).send(errorMessages[404])
            return res.json(response.map(user => ({ ...user, password: '' })));
        } catch (err) {
            return res.status(500).send(errorMessages[500]);
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const { id } = req.params,
                response = await UserService.getBy({ id: Number(id) });

            if (!response) return res.status(404).send(errorMessages[404])

            return res.json({ ...response, password: '' });
        } catch (err) {
            console.log(err)
            return res.status(500).send(errorMessages[500]);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params,
                existentObj = await UserService.getBy({ id: Number(id) });

            if (!existentObj) return res.status(404).send(errorMessages[404]);

            const response = await UserService.delete({ id: Number(id) });

            return res.json({ ...response, password: '' });
        } catch (err) {
            return res.status(500).send(errorMessages[500]);
        }
    }
}

export default new UserController(UserService);