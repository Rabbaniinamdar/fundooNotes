/* eslint-disable prettier/prettier */
import Note from '../models/note.model';
import dotenv from 'dotenv';
dotenv.config();
import { client } from '../config/redis';

// Create New Note
export const addToNote = async (currentUser, body) => {
    body.userId = currentUser;
    console.log('currentUser'+ currentUser);
    await client.del(currentUser);
    const newNote = await Note.create(body);
    console.log('newNote' + newNote)
    return newNote;
};

// Get all Notes of a particular user
export const getAllNoteOfUser = async (currentUser) => {
    const notes = await Note.find({ userId: currentUser });
    console.log('No catche data' + notes)
    client.set(currentUser, JSON.stringify(notes));
    return notes;
};

// Get a single Note of a user
export const getNoteofUser = async (id) => {
    const data = await Note.findById(id);
    client.set(id, JSON.stringify(data));
    return data;
};

// Delete a single Note
export const deleteNote = async (id, currentUser) => {
    await Note.findByIdAndDelete(id);
    await client.del(currentUser);
    return '';
};

// Update a single Note
export const updateNote = async (id, body, currentUser) => {
    const data = await Note.findByIdAndUpdate(
        id,
        body,
        {
            new: true
        }
    );
    await client.del(currentUser);
    return data;
};

// Get all archived Notes
export const archiveNote = async (currentUser) => {
    const data = await Note.find({ archived: true, userId: currentUser });
    await client.del(currentUser);
    return data;
};

// Archive a single Note
export const addToArchive = async (id, currentUser) => {
    const data = await Note.findByIdAndUpdate(
        id,
        { archived: true },
        { new: true }
    );
    await client.del(currentUser);
    return data;
};

// Unarchive a single Note
export const unArchive = async (id, currentUser) => {
    const data = await Note.findByIdAndUpdate(
        id,
        { archived: false },
        { new: true }
    );
    await client.del(currentUser);
    return data;
};
