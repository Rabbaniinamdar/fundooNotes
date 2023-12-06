/* eslint-disable prettier/prettier */
import User from '../models/user.model';
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

// Log in the user and generate a JWT
export const forgetPassword = async (body) => {
  console.log(body)
  let { email, password, confirmpassword } = body;
  const user = await User.findOne({ email: email });
  const isCurrPrevMatch = await bcrypt.compare(password, user.password);
  if (user) {
    if (!isCurrPrevMatch) {
      if (password === confirmpassword) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        body.password = hash;
        body.confirmpassword = hash;
        const data = await User.findByIdAndUpdate(
          user.id,
          body,
          {
            new: true
          }
        );
        return data;
      } else {
        throw new Error('Password is not matching');
      }
    } else {
      throw new Error('Enterd Password shuold not same as previous password');
    }
  } else {
    throw new Error('User not found');
  }
}

export const resetPassword = async (id, body) => {
  let { oldpassword, newpassword, confirmpassword } = body;
  const user = await User.findById(id);
  const isCurrPrevMatch = await bcrypt.compare(oldpassword, user.password);
  console.log(isCurrPrevMatch)
  if (isCurrPrevMatch) {
    if (oldpassword !== newpassword) {
      if (newpassword === confirmpassword) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newpassword, salt);
        body.password = hash;
        body.confirmpassword = hash;
        const data = await User.findByIdAndUpdate(
          user.id,
          body,
          {
            new: true
          }
        );
        return data;
      } else {
        throw new Error('New Password and Confirm password is not matching');
      }
    } else {
      throw new Error('Old Password and New Password shuold not be same.');
    }
  } else {
    throw new Error('Old Password is Not Correct.');
  }
}
