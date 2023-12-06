/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';
const AddToNoteSchema = new Schema(
    {
        userId: {
            type: String
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        archived: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export default model('AddToNote', AddToNoteSchema);