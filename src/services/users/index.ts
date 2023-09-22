import { Service } from "../abstract";
import { User, PrismaClient } from "@prisma/client"

class UserService extends Service<User> {
    constructor() {
        const prisma = new PrismaClient();
        super(prisma.user);
    }
}

export default new UserService();