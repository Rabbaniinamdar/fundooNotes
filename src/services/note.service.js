/* eslint-disable prettier/prettier */
import Note from '../models/note.model';
import dotenv from 'dotenv';
dotenv.config();

//Create New Note
export const addToNote = async (currentUser, body) => {
    body.userId = currentUser
    console.log(currentUser)
    const newNote = await Note.create(body);
    return newNote;
};

//get all Not of a particular user
export const getAllNoteOfUser = async (currentUser) => {
    const notes = await Note.find({ userId: currentUser });
    return notes;
};

//get all Notes of a user
export const getNoteofUser = async (id) => {
    const data = await Note.findById(id);
    return data;
};

//delete single Note
export const deleteNote = async (id) => {
    await Note.findByIdAndDelete(id);
    return '';
};

//update single Note
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

//get all archive Notes
export const archiveNote = async (currentUser) => {
    const data = await Note.find({ archived: true, userId: currentUser });
    return data;
};

//archive a single Note
export const addToArchive = async (id) => {
    const data = await Note.findByIdAndUpdate(
        id,
        { archived: true },
        { new: true }
    );

    return data;
};

//unarchive a single Note
export const unArchive = async (id) => {
    const data = await Note.findByIdAndUpdate(
        id,
        { archived: false },
        { new: true }
    );
    return data;
};