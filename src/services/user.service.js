/* eslint-disable prettier/prettier */
import User from '../models/user.model';
//get all users
// export const getAllUsers = async () => {
//   const data = await User.find();
//   return data;
// };

//create new user
export const UserRegister = async (body) => {
  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      // Check if password matches confirm password
      if (body.password === body.confirmpassword) {
        const data = await User.create(body);
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


//update single user
// export const updateUser = async (_id, body) => {
//   const data = await User.findByIdAndUpdate(
//     {
//       _id
//     },
//     body,
//     {
//       new: true
//     }
//   );
//   return data;
// };

// //delete single user
// export const deleteUser = async (id) => {
//   await User.findByIdAndDelete(id);
//   return '';
// };

// //get single user
// export const getUser = async (id) => {
//   const data = await User.findById(id);
//   return data;
// };


