/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    const user = await jwt.verify(bearerToken, secretKey);
    res.locals.user = user;
    res.locals.token = bearerToken;
    console.log(res.locals.user)
    next();
  } catch (error) {
    next(error);
  }
};
