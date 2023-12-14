/* eslint-disable prettier/prettier */
import { createClient } from 'redis';
import logger from './logger';
export const client = createClient();

const clientRedis = async () => {
    try {
        await client.connect();
        logger.info('connected to the reddis database');
    } catch (error) {
        logger.error('could not connect to the reddise database');
    }
}

export default clientRedis;