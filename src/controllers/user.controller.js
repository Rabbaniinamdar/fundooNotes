/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const getAllUsers = async (req, res) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users Details fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unable to fetched the all user details. Please try again later.'
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const data = await UserService.getUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User Details fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unable to fetched the user details. Please try again later.'
    });
  }
};

export const newUser = async (req, res) => {
  try {
    const user = await UserService.getUserByEmail({
      email: req.body.email
    });
    // If user doesn't exist, user can be created
    if (!user) {
      //check password is matching with  confirmpassword
      if (req.body.password === req.body.confirmpassword) {
        const data = await UserService.newUser(req.body);
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'User created successfully'
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: 'Password is not matching'
        });
      }
    } else {
      // If user already exists, return bad request status
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: 'User already existed'
      });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unable to complete the registration process. Please try again later.'
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const user = await UserService.getUserByEmail({ email: req.body.email });

    if (user) {
      // if User exists, check password is correct or not
      if (req.body.password === user.password) {
        //if Passwords match
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: user,
          message: 'User logged in successfully'
        });
      } else {
        // Passwords don't match
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: 'Incorrect password'
        });
      }
    } else {
      //if User not found
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'User not found'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unable to complete the login process. Please try again later.'
    });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    if (req.body.password === req.body.confirmpassword) {
      const data = await UserService.updateUser(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'User updated successfully'
      });
    }else{
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: req.body,
        message: 'Password is not matching'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
