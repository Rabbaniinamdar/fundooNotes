/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
// eslint-disable-next-line max-len
import { newUserValidator, loginUserValidator } from '../validators/user.validator';
// import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('/register', newUserValidator, userController.UserRegister);

//route to login the user
router.post('/login', loginUserValidator, userController.userLogin);


export default router;
