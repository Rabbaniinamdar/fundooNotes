/* eslint-disable prettier/prettier */
import express from 'express';
import * as noteController from '../controllers/note.controller';

// eslint-disable-next-line max-len
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add to note
router.post('/addnote', userAuth, noteController.addToNote);


export default router;
