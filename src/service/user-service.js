import {validate} from '../validation/validation.js';
import schema from '../validation/user-validation.js';
import {prismaClient} from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
const signature = process.env.signature 

const register = async(request)=> {
     const result = validate(schema.register, request)

     if (!result.username) {
        throw new Error("Username tidak valid");
    }

     const countUser = await prismaClient.user.count({where: {username: result.username}, select: {username: true, password: true}})

     if (countUser === 1) {
        throw new Error("User sudah terdaftar")
     }
     result.password = await bcrypt.hash(result.password, 10) 

     return prismaClient.user.create({
        data: result,
        select: {
            name: true
        }
     })
}

const login = async(request) => {
    const rahasia = "1111111111113434344323241241424"
    const result = validate(schema.login, request)
    const user = await prismaClient.user.findUnique({where: {username: result.username}})

    if (!user) {
        throw new Error("username atau password salah")
    }
    const isCorrect = await bcrypt.compare(result.password, user.password)
    if (!isCorrect) {
        throw new Error("username or password salah")
    }

    return jwt.sign({username: user.username}, signature, {expiresIn: "1h"})
}

const curhatan = async(user, request) => {
    const curhatData = {
        userId: user.id, // Mengisi username dengan username pengguna yang sedang masuk
        curhatan: request.curhatan
    }

    console.info(curhatData)
    const curhat = await prismaClient.contact.create({
        data: curhatData,
        select: {
            userId: true,
            curhatan: true
        }
    })

    return curhat
}

export default {
    register,
    login,
    curhatan
}