/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import bcrypt from 'bcrypt'

//create new user
export const UserRegister = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      // Check if password matches confirm password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(body.password, salt);
      if (body.password === body.confirmpassword) {
        body.password = hash
        body.confirmpassword = hash
        const data = await User.create(body);
        console.log(data)
        return data;
      } else {
        return 'Password is not matching';
      }
    } else {
      // If user already exists, return a message
      return 'User already exists';
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return 'An error occurred during registration';
  }
};



export const userLogin = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user) {
    // Check if the provided password matches the stored hash
    // eslint-disable-next-line max-len
    const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
    console.log(isPasswordCorrect)
    if (isPasswordCorrect) {
      // Passwords match
      return 'User logged in successfully';
    } else {
      // Passwords don't match
      return 'Incorrect password';
    }
  } else {
    // User not found
    return 'User not found';
  }
};

