/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator, loginUserValidator } from '../validators/user.validator';
import { resetPasswordAuth } from '../middlewares/auth.middleware'
import { getUserMiddleware } from '../middlewares/redis.middleware'

const router = express.Router();

// Route to create a new user
router.post('/', newUserValidator, userController.UserRegister);

// Route to login a user
router.post('/login', loginUserValidator, userController.userLogin);

router.get('/:email', getUserMiddleware, userController.getUser);

// Route to forget password
router.post('/forgetpassword', userController.forgetPassword);

// Route to reset password
router.post('/resetpassword', resetPasswordAuth, userController.resetPassword);

export default router;
