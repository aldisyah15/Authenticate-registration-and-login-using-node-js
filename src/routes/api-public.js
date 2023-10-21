import express from 'express';
import controller from '../controller/user-controller.js';

export const publicRouter = new express.Router()
publicRouter.post('/register',controller.register)
publicRouter.post('/login',controller.login)