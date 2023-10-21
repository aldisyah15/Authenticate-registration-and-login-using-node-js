import express from 'express';
import { auth } from '../middleware/middleware-auth.js';
import controller from '../controller/user-controller.js';

export const privateRouter = new express.Router()
privateRouter.use(auth)
privateRouter.post("/curhatan", controller.curhat)
