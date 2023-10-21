import joi from 'joi';

const register = joi.object({
    name: joi.string(),
    username: joi.string().max(200).required(),
    password: joi.string().max(200).required(),
    email: joi.string().email().required()
})

const login = joi.object({
    username: joi.string().max(200).required(),
    password: joi.string().required()
})

export default {
    register,
    login
}