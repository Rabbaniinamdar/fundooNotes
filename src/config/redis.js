/* eslint-disable prettier/prettier */
import { createClient } from 'redis';

export const client = createClient();

const clientRedis = async () => {
    try {
        await client.connect();
        console.log('connected to the reddis database');
    } catch (error) {
        console.log('could not connect to the reddise database');
    }
}

export default clientRedis;