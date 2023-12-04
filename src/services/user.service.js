/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import Note from '../models/note.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SecretKey = process.env.SECRET_KEY;

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SecretKey, { expiresIn: '1h' });
  return token;
};

// Create a new user and generate a JWT
export const UserRegister = async (body) => {
  let { email, password, confirmpassword } = body;
  const user = await User.findOne({ email: email });
  // If user not exists
  if (!user) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // Check if password matches confirm password
    if (password === confirmpassword) {
      body.password = hash;
      body.confirmpassword = hash;
      const newUser = await User.create(body);
      // Generate and return a JWT
      return { data: 'User Registered Successfully', newUser };
    } else {
      throw new Error('Password is not matching');
    }
  } else {
    throw new Error('User already exists');
  }
}

// Log in the user and generate a JWT
export const userLogin = async (body) => {
  let { email, password } = body;
  const user = await User.findOne({ email: email });
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      // Passwords match, generate and return a JWT
      const token = generateToken(user._id);
      return { data: 'User Logged in Successfully', token };
    } else {
      throw new Error('Incorrect password');
    }
  } else {
    throw new Error('User not found');
  }
};

export const addToNote = async (res, body) => {
  const currentUser = res.locals.user.userId;
  body.email = currentUser
  const newNote = await Note.create(body);
  return newNote;
};
