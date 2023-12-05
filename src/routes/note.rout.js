/* eslint-disable prettier/prettier */
import express from 'express';
import * as noteController from '../controllers/note.controller';

// eslint-disable-next-line max-len
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add to note
router.post('/', userAuth, noteController.addToNote);

router.get('/', userAuth, noteController.getAllNoteOfUser);

router.get('/:id', userAuth, noteController.getNoteofUser);

router.put('/:id', noteController.updateNote);

router.delete('/:id', noteController.deleteNote);



export default router;
