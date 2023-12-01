/* eslint-disable prettier/prettier */
import { Schema, model } from 'mongoose';

const userRegisterSchema = new Schema(
  {
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    confirmpassword: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('UserRegister', userRegisterSchema);