/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};

export const resetPasswordAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY_NAME);
    req.body.userId = user.userId;
    next();
  } catch (error) {
    next(error);
  }
};
