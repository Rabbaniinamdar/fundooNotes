/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import HttpStatus from 'http-status-codes';
import * as userUtils from '../utils/user.util';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (userId) => {
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
      const token = generateToken(user._id);
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
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    return userUtils.sendEmail(token, email);
  } catch (error) {
    throw new Error('Internal server error');
  }
};

export const resetPassword = async (token, body) => {
  try {
    let bearerToken = token;
    if (!bearerToken) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    }

    const decodedToken = jwt.verify(bearerToken, SECRET_KEY);

    const hashedPassword = hashPassword(body.password)

    const user = await User.findByIdAndUpdate(
      decodedToken.userId,
      { password: hashedPassword },
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
