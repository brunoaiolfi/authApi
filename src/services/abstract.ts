import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";

export class Service<T> {
    public Model: PrismaClient<PrismaClientOptions, never, undefined>;

    constructor(Model: any) {
        this.Model = Model;
    }

    public async create<K>(data: K): Promise<T> {
        // @ts-ignore
        const response = await this.Model.create({ data });
        return response;
    }

    public async getOne<K>(where: any): Promise<T> {
        // @ts-ignore
        const response = await this.Model.create({ data });
        return response;
    }
}

