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

    public async update(where: any, data: T){
        // @ts-ignore
        const response = await this.Model.update({
            data,
            where
        })
        return response
    }

    public async getAll(): Promise<T[]> {
        // @ts-ignore
        const response = await this.Model.findMany();
        return response;
    }
    
    public async getBy(where: any): Promise<T> {
        // @ts-ignore
        const response = await this.Model.findFirst(where);
        return response;
    }

    public async delete(where: any): Promise<T> {
        // @ts-ignore
        const response = await this.Model.delete({ where });
        return response;
    }
}

