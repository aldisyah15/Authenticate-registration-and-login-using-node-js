import {PrismaClient} from '@prisma/client';
import {logger} from '../config/logger.js';

export const prismaClient = new PrismaClient({
    log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
      ],
})

prismaClient.$on('query', (e)=> {
    logger.info(e.query)
})

prismaClient.$on('error', (e)=> {
    logger.info(e.error)
})