/* eslint-disable prettier/prettier */
import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add to note
router.post('', userAuth, noteController.addToNote);

//route to get all note of particular user
router.get('', userAuth, noteController.getAllNoteOfUser);

//route to add single note of particular user

//route to update note
router.put('/:id', userAuth, noteController.updateNote);

//route to delete note
router.delete('/:id', userAuth, noteController.deleteNote);

router.get('/archive', userAuth, noteController.archiveNote);

router.get('/:id', userAuth, noteController.getNoteofUser);

router.put('/archive/:id', userAuth, noteController.addToArchive);

router.put('/unarchive/:id', userAuth, noteController.unArchive);

router.delete('/deletearchive/:id', userAuth, noteController.deleteNote);

export default router;

