/* eslint-disable prettier/prettier */
import { client } from '../config/redis'

export const cacheMiddleware = async (req, res, next) => {

    const currentUser = res.locals.user.userId;
    console.log('userId', currentUser);
    try {
        const catchData = await client.get(currentUser);
        console.log('catchData ' + catchData)
        if (catchData) {
            console.log('Data retrieved from cache', catchData);
            return res.json(JSON.parse(catchData));
        }
        next();
    } catch (error) {
        console.log('Error retrieving user data from Redis:', error);
        next();
    }
};
