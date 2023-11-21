import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";


const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(`the parameters are ${username}. email: ${email}. password: ${password}.`);

  if (!username || !email || !password) {

    throw new Error("Need to send the required information! ")
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).send("User already exists");
  } else {
    console.log(`Adding user : ${username}. email: ${email}. password: ${password}.`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    console.error(error);
    throw new Error("Error on save user into database = Invalid user data");
  }
});


const loginUser = asyncHandler( async ( req, res ) => {
  const { email, password } = req.body;

  console.log(`Loging-in user email: ${email}. password: ${password}.`);

  try {
    const existingUser = await User.findOne({ email });

    if(existingUser) {
      const isPasswardValid = await bcrypt.compare(password, existingUser.password);

      if( isPasswardValid ) {
        createToken(res, existingUser._id);

        res.status(201).json({
          _id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
          isAdmin: existingUser.isAdmin,
        });

        console.log("><🚀><User Loged in successfully.>>><🟢><<<");

        return;
      }
    }
  } catch (error) { 
    res.status(400);
    console.error(error);
    throw new Error("Error on loging-in user = Invalid user data");
  }
});


const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httyOnly: true,
    expires: new Date(0),
  });
  console.log("><🚶><User Loged out.>>><🛫><<<");

  res.status(200).json({ message: "Logged out successfully" });
});


const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});


const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  console.log("><🚶><Getting User Profile.");

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });

  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});


const updateCurrentUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });

    console.log("><🚀><User Profile successfully updated!>>><🟢><<<");

  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler( async( req, res ) => {
  const user = await User.findById(req.params.id);

  if( user ) {
    if( user.isAdmin ) {
      res.status( 400 )
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({_id: user._id});
    res.json({ message: "User Removed" });

  } else {

    res.status( 404 )
    throw new Error("User not found.");

  }

})

const getUserById = asyncHandler( async( req, res ) => {
  const user = await User.findById(req.params.id).select("-password");

  console.log("><🚌><Get user by ID:!>>><🚕><<<");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }

})


const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Update User failed!🔴");
  }
});



export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getUserById,
  updateUserById,
  deleteUserById 
};
