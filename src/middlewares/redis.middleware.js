/* eslint-disable prettier/prettier */
import { createClient } from 'redis';

export const client = createClient({
    host: '127.0.0.1',
    port: 6379,
    enableOfflineQueue: false,
});

export const getUserMiddleware = (req, res, next) => {

    const email = req.params.email;
    client.get(email, (err, userData) => {
        if (err) {
            throw new Error('Error retrieving user data from Redis:', err);
        }
        if (userData) {
            console.log(userData)
            req.user = JSON.parse(userData);
            next();
        } else {
            next();
        }
    });
};
