/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
// eslint-disable-next-line max-len
import { newUserValidator, loginUserValidator } from '../validators/user.validator';
// import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
// router.get('', userController.getAllUsers);

//route to create a new user
router.post('/register', newUserValidator, userController.UserRegister);

//route to login the user
router.post('/login', loginUserValidator, userController.userLogin);

//route to get a single user by their user id
// router.get('/:_id', userController.getUser);

//route to update a single user by their user id
// router.put('/:_id', UpdateUserValidator, userController.UserUpdate);

//route to delete a single user by their user id
// router.delete('/:_id', userController.deleteUser);

export default router;
