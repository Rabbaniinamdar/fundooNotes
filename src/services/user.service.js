/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SecretKey = process.env.SECRET_KEY;

//Function to Generate the JWT Token
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SecretKey, { expiresIn: '1h' });
  return token;
};

//Function to Hash(encrypt) the password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// Create a new user
export const UserRegister = async (body) => {
  let { email, password, confirmpassword } = body;
  const user = await User.findOne({ email: email });
  // If user not exists
  if (!user) {
    const hash = await hashPassword(password);
    console.log(hash)
    // Check if password matches confirm password
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

// Forget Password
export const forgetPassword = async (body) => {
  try {
    let { email, password, confirmpassword } = body;
    const user = await User.findOne({ email: email });

    //if the enterd email is not correct
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the current password matching the stored password
    const isCurrPrevMatch = await bcrypt.compare(password, user.password);
    if (!isCurrPrevMatch) {

      // Check if password matching confirm password
      if (password === confirmpassword) {
        const hash = await hashPassword(password);
        body.password = hash;
        body.confirmpassword = hash;

        //update new password
        const updatePassword = await User.findByIdAndUpdate(
          user.id,
          body,
          {
            new: true
          }
        );
        return updatePassword;
      } else {
        throw new Error('Password is not matching');
      }
    } else {
      throw new Error('Entered Password should not be the same as the previous password');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Reset Password
export const resetPassword = async (id, body) => {
  let { oldpassword, newpassword, confirmpassword } = body;
  const user = await User.findById(id);

  // Check if the current password matching the stored password
  const isCurrPrevMatch = await bcrypt.compare(oldpassword, user.password);
  if (isCurrPrevMatch) {
    if (oldpassword !== newpassword) {

      // Check if password matching confirm password
      if (newpassword === confirmpassword) {
        const hash = await hashPassword(password);
        body.password = hash;
        body.confirmpassword = hash;

        //update new password
        const updatePassword = await User.findByIdAndUpdate(user.id,
          body,
          {
            new: true
          }
        );
        return updatePassword;
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
