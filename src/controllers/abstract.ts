import { Request, Response } from "express";
import { errorMessages } from "../utils/messages/errors";

export class Controller<T> {

    public service: any;

    constructor(service: any) {
        this.service = service;
    }

    public async create(req: Request, res: Response) {
        try {
            const dto: T = req.body,
                response = await this.service.create(dto);

            return res.json(response);
        } catch (err) {
            return res.status(500).send(errorMessages[500]);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params,
                dto: T = req.body,
                existentObj = await this.service.getBy({ where: { id: Number(id) } });

            if (!existentObj) return res.status(404).send(errorMessages[404]);

            const response = await this.service.update({ id: Number(id) }, dto);

            return res.send(response)

        } catch (error) {
            return res.status(500).send(errorMessages[500]);
        }
    }

    public async getAll(req: Request, res: Response) {
        try {
            const response = await this.service.getAll();
            if (!response.length) return res.status(404).send(errorMessages[404])

            return res.json(response);
        } catch (err) {
            return res.status(500).send(errorMessages[500]);
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const { id } = req.params,
                response = await this.service.getBy({ where: { id: Number(id) } });

            if (!response) return res.status(404).send(errorMessages[404])

            return res.json(response);
        } catch (err) {
            return res.status(500).send(errorMessages[500]);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params,
                existentObj = await this.service.getBy({ where: { id: Number(id) } });

            if (!existentObj) return res.status(404).send(errorMessages[404]);

            await this.service.delete({ id: Number(id) });

            return res.status(204).send();
        } catch (err) {
            return res.status(500).send(errorMessages[500]);
        }
    }

}