import { Service } from "../abstract";
import { User, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

interface updateUser {
    name?: string,
    username?: string,
    password?: string,
}
class UserService extends Service<User> {
    constructor() {
        super(prisma.user);
    }

    public async update(where: any, data: updateUser) {
        // @ts-ignore
        const response = await this.Model.update({
            data,
            where
        })
        return response
    }
}

export default new UserService();