/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator, loginUserValidator } from '../validators/user.validator';

const router = express.Router();

// Route to create a new user
router.post('/register', newUserValidator, userController.UserRegister);

// Route to login a user
router.post('/login', loginUserValidator, userController.userLogin);

// Route to forget password
router.post('/forgetpassword', userController.forgetPassword);

// Route to reset password
router.post('/resetpassword/:token', userController.resetPassword);

export default router;
