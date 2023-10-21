import { logger } from '../config/logger.js';
import service from '../service/user-service.js';

const register = async (req, res, next) => {
    try {
        const result = await service.register(req.body)
        logger.info(result)
        res.status(200).json({
            message: result
        })
    } catch (e) {
        next(e)
    }
}

const login = async (req, res, next) => {
    try {
        const result = await service.login(req.body)
        res.status(200).json({
            result
        })
    } catch (e) {
        next(e)
    }
}

const curhat = async(req, res, next) => {
   try {
   // const user = await prismaClient.user.findUnique({ where: { username } });
    const user = req.user
    const result = await service.curhatan(user,req.body)
    res.status(200).json({
        curhatan: result
    })
   } catch (e) {
    next(e)
   }
}
export default{
    register,
    login,
    curhat
}