/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
// eslint-disable-next-line max-len
import { newUserValidator, loginUserValidator, forgetPasswordValidator, resetPasswordValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('/register', newUserValidator, userController.UserRegister);

//route to login the user
router.post('/login', loginUserValidator, userController.userLogin);

//route to do Forget password
router.put('/forgetpassword', forgetPasswordValidator, userController.forgetPassword);

//route to do Reset password
router.put('/resetpassword/:id', userAuth, resetPasswordValidator, userController.resetPassword);


export default router;
