import { Service } from "../abstract";
import { User, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

class UserService extends Service<User> {
    constructor() {
        super(prisma.user);
    }
}

export default new UserService();