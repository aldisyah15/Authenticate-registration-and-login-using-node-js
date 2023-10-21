import jwt from 'jsonwebtoken';
import { prismaClient } from '../config/database.js';
import dotenv from 'dotenv';
dotenv.config()
const signature = process.env.signature 

export const auth = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        throw new Error("Tidak ada token");
    }

    try {
        const decode = jwt.verify(token, signature);
        const user = await prismaClient.user.findUnique({ where: { username: decode.username } });
        if (!user) {
            throw new Error("Tidak ada token");
        }
        req.user = user;
        next();
    } catch (e) {
        
    }
}
