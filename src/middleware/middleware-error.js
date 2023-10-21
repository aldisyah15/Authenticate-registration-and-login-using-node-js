import { logger } from "../config/logger.js"

export const middleware_error = (err, req, res, next) => {
    if (!err) {
        next()
        return
    } else {
        logger.info(err.message)
        res.status(500).json({
            message: err.message
        })
    }
}