/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

// export const getAllUsers = async (req, res) => {
//   try {
//     const data = await UserService.getAllUsers();
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: data,
//       message: 'All users Details fetched successfully'
//     });
//   } catch (error) {
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       code: HttpStatus.INTERNAL_SERVER_ERROR,
//       message: 'Unable to fetched the all user details. Please try again later.'
//     });
//   }
// };

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

export const UserRegister = async (req, res) => {
  try {
    const data = await UserService.UserRegister(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unable to complete the registration process. Please try again later.'
    });
  }
};



// export const UserUpdate = async (req, res, next) => {
//   try {
//     if (req.body.password === req.body.confirmpassword) {
//       const data = await UserService.updateUser(req.params._id, req.body);
//       res.status(HttpStatus.ACCEPTED).json({
//         code: HttpStatus.ACCEPTED,
//         data: data,
//         message: 'User updated successfully'
//       });
//     } else {
//       res.status(HttpStatus.BAD_REQUEST).json({
//         code: HttpStatus.BAD_REQUEST,
//         data: req.body,
//         message: 'Password is not matching'
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteUser = async (req, res, next) => {
//   try {
//     await UserService.deleteUser(req.params._id);
//     res.status(HttpStatus.OK).json({
//       code: HttpStatus.OK,
//       data: [],
//       message: 'User deleted successfully'
//     });
//   } catch (error) {
//     next(error);
//   }
// };