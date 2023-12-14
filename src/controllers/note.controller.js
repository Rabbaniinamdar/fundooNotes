/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

export const addToNote = async (req, res) => {
    try {
        const currentUserId = res.locals.user.userId;
        const data = await NoteService.addToNote(currentUserId, req.body);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};

export const getAllNoteOfUser = async (req, res) => {
    try {
        const currentUser = res.locals.user.userId;
        const data = await NoteService.getAllNoteOfUser(currentUser);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};

export const getNoteofUser = async (req, res) => {
    try {
        const data = await NoteService.getNoteofUser(req.params.id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Note fetched successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const data = await NoteService.updateNote(req.params.id, req.body);
        res.status(HttpStatus.ACCEPTED).json({
            code: HttpStatus.ACCEPTED,
            data: data,
            message: 'User updated successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};


export const deleteNote = async (req, res) => {
    try {
        await NoteService.deleteNote(req.params.id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Note deleted successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};


export const archiveNote = async (req, res) => {
    const currentUser = res.locals.user.userId;
    try {
        const data = await NoteService.archiveNote(currentUser);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Fetched Archived Notes Successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};

export const addToArchive = async (req, res) => {
    try {
        await NoteService.addToArchive(req.params.id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Note Archived Successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};


export const unArchive = async (req, res) => {
    try {
        await NoteService.unArchive(req.params.id);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            message: 'Note Unarchived Successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};