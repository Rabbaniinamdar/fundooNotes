/* eslint-disable prettier/prettier */
import express from 'express';
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { cacheMiddleware } from '../middlewares/redis.middleware'
import { newNoteValidator } from '../validators/note.validator';
const router = express.Router();

//route to add to note
router.post('/', newNoteValidator, userAuth, noteController.addToNote);

//route to get all note of particular user
router.get('/', userAuth, cacheMiddleware, noteController.getAllNoteOfUser);

//route to update note
router.put('/:id', userAuth, cacheMiddleware, noteController.updateNote);

// //route to delete note
// router.delete('/:id', userAuth, noteController.deleteNote);

//route to get all archive note
router.get('/archive', userAuth, noteController.archiveNote);

//route to add single note of particular user
router.get('/:id', userAuth, noteController.getNoteofUser);

//route to do unarchive a note
router.put('/archive/:id', userAuth, noteController.addToArchive);

//route to do unarchive a note
router.put('/unarchive/:id', userAuth, noteController.unArchive);

//route to do delete archive a note
router.delete('/deletearchive/:id', userAuth, noteController.deleteNote);

export default router;

