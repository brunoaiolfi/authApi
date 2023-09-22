import { Request, Response } from "express";

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
            return res.status(500).send(err);
        }
    }
   
}