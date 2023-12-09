/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const UserRegister = async (req, res) => {
  try {
    const data = await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const data = await UserService.loginUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const data = await UserService.resetPassword(req, req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

