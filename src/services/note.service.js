/* eslint-disable prettier/prettier */
import Note from '../models/note.model';
import dotenv from 'dotenv';
dotenv.config();

export const addToNote = async (currentUser, body) => {
    body.userId = currentUser
    const newNote = await Note.create(body);
    return newNote;
};

//get all Not of a particular user
export const getAllNoteOfUser = async (currentUser) => {
    console.log(currentUser)
    const notes = await Note.find({ userId: currentUser });
    return notes;
};

//get single Note
export const getNoteofUser = async (id) => {
    const data = await Note.findById(id);
    return data;
};

//delete single Note
export const deleteNote = async (id) => {
    await Note.findByIdAndDelete(id);
    return '';
};

export const updateNote = async (id, body) => {
    const data = await Note.findByIdAndUpdate(
        id,
        body,
        {
            new: true
        }
    );
    return data;
};
