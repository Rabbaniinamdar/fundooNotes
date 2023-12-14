/* eslint-disable prettier/prettier */
import { client } from '../config/redis';
import HttpStatus from 'http-status-codes';

export const cacheMiddleware = async (req, res, next) => {
    try {
        const currentUser = res.locals.user?.userId;

        if (!currentUser) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: HttpStatus.BAD_REQUEST,
                message: 'User information not available.',
            });
        }

        const cachedData = await client.get(currentUser);

        if (cachedData) {
            return res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: JSON.parse(cachedData),
            });
        }

        next();
    } catch (error) {
        console.error('Error in cacheMiddleware:', error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
        });
    }
};
