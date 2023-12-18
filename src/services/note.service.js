/* eslint-disable prettier/prettier */
import Note from '../models/note.model';
import dotenv from 'dotenv';
dotenv.config();
import { client } from '../config/redis';

// Create New Note
export const addToNote = async (currentUserId, body) => {
    body.userId = currentUserId;
    await client.del(currentUserId);
    const newNote = await Note.create(body);
    return newNote;
};

// Get all Notes of a particular user
export const getAllNoteOfUser = async (currentUserId) => {
    const notes = await Note.find({ userId: currentUserId });
    console.log('Notes retried from Database' + notes)
    client.set(currentUserId, JSON.stringify(notes));
    return notes;
};

// Get a single Note of a user
export const getNoteofUser = async (id) => {
    const data = await Note.findById(id);
    client.set(id, JSON.stringify(data));
    return data;
};

// Delete a single Note
export const deleteNote = async (id, currentUserId) => {
    await Note.findByIdAndDelete(id);
    await client.del(currentUserId);
    return '';
};

// Update a single Note
export const updateNote = async (id, body, currentUserId) => {
    const data = await Note.findByIdAndUpdate(
        id,
        body,
        {
            new: true
        }
    );
    await client.del(currentUserId);
    return data;
};

// Get all archived Notes
export const archiveNote = async (currentUserId) => {
    const data = await Note.find({ archived: true, userId: currentUserId });
    console.log(data)
    await client.del(currentUserId);
    return data;
};

// Archive a single Note
export const addToArchive = async (id, currentUserId) => {
    const data = await Note.findByIdAndUpdate(
        id,
        { archived: true },
        { new: true }
    );
    await client.del(currentUserId);
    return data;
};

// Unarchive a single Note
export const unArchive = async (id, currentUserId) => {
    const data = await Note.findByIdAndUpdate(
        id,
        { archived: false },
        { new: true }
    );
    await client.del(currentUserId);
    return data;
};
