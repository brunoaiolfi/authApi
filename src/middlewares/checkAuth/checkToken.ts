import { NextFunction, Request, Response } from "express";
import { errorMessages } from "../../utils/messages/errors";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";

config()
const { SECRET } = process.env

export function checkTokenMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const bearerHeader = req.headers.authorization;

        if (!bearerHeader || typeof bearerHeader !== 'string') {
            return res.status(401).send(errorMessages[401])
        }

        const token = bearerHeader.replace('Bearer ', '');

        const data = verify(token, String(SECRET));
        res.locals.authData = data;
        
        next()
    } catch (error) {
        return res.status(401).send(errorMessages[401])
    }
}