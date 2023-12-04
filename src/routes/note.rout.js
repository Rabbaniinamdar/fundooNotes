/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
// eslint-disable-next-line max-len
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add to note
router.post('/addnote', userAuth, userController.addToNote);


export default router;
