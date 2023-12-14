/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as emailUtils from '../utils/email.util';
import * as sendUtils from '../utils/send.utils'

dotenv.config();

const generateToken = (userId, SECRET_KEY) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const registerUser = async (body) => {
  let { email, password, confirmpassword } = body;
  const user = await User.findOne({ email: email });
  if (!user) {
    const hash = await hashPassword(password);
    if (password === confirmpassword) {
      body.password = hash;
      body.confirmpassword = hash;
      const newUser = await User.create(body);
      sendUtils.sendMessage({ email, message: 'Thank You for Registaring.' })
      return { data: 'User Registered Successfully', newUser };
    } else {
      throw new Error('Password is not matching');
    }
  } else {
    throw new Error('User already exists');
  }
};

export const loginUser = async (body) => {
  let { email, password } = body;
  const user = await User.findOne({ email: email });
  if (user) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const token = generateToken(user._id, process.env.SECRET_KEY);
      return { data: 'User Logged in Successfully', token };
    } else {
      throw new Error('Incorrect password');
    }
  } else {
    throw new Error('User not found');
  }
};


export const forgetPassword = async (body) => {
  try {
    const { email } = body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const token = generateToken(user._id, process.env.SECRET_KEY_NAME)

    return emailUtils.sendEmail(token, email);
  } catch (error) {
    throw new Error('Internal server error');
  }
};


export const resetPassword = async (req, userdetails) => {
  try {
    let bearerToken = req.header('Authorization');
    const decodedToken = jwt.verify(bearerToken, process.env.SECRET_KEY_NAME);
    const hashedPassword = await hashPassword(userdetails.userId);
    const user = await User.findByIdAndUpdate(
      decodedToken.userId,
      {
        password: hashedPassword,
        confirmpassword: hashedPassword,
      },
      { new: true }
    );
    if (!user) {
      throw new Error('User not found');
    }
    return { message: 'Password reset successfully' };
  } catch (error) {
    throw new Error('Internal server error: ' + error.message);
  }
};
