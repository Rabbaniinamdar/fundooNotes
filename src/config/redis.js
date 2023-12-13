/* eslint-disable prettier/prettier */
import { createClient } from 'redis';
import logger from './logger';

export const client = createClient();
console.log('client rabbani' + client)

const clientRedis = async () => {
    try {
        await client.connect();
        logger.info('Connected to the Redis database');
    } catch (error) {
        logger.error('Could not connect to the Redis database: ' + error);
    }
};

export default clientRedis;
