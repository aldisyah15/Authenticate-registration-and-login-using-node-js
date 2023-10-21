import express from 'express';
import { logger } from './src/config/logger.js';
import {publicRouter} from './src/routes/api-public.js';
import {privateRouter} from './src/routes/api-private.js';
import {middleware_error} from './src/middleware/middleware-error.js';

const app = express()
app.use(express.json());
app.use(publicRouter)
app.use(privateRouter)



app.use(middleware_error)
app.listen(3000, () => {
    logger.info("app run on port 3000")
})