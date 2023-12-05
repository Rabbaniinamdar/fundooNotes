/* eslint-disable prettier/prettier */
import Note from '../models/note.model';
import dotenv from 'dotenv';
dotenv.config();

export const addToNote = async (currentUser, body) => {
    body._id = currentUser
    const newNote = await Note.create(body);
    return newNote;
};
