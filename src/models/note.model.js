/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';
const AddToNoteSchema = new Schema(
    {
        email: {
            type: String
        },
        title: {
            type: String
        },
        discription: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default model('AddToNote', AddToNoteSchema);