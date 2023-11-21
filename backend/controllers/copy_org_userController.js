import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

const createUser = asyncHandler( async ( req, res ) => {
  // res.send(">><🎉🏋️‍♂️🎉> createUser endpoint: create an user in the database...");
  const { username, email, password } = req.body;
  if( !username || !email || !password ) {
    console.log(`the parameters are ${username}. email: ${email}. password: ${password}.`);

    throw new Error("Need to send the required information! ")
  }

  const userExists = await User.findOne({email});
  if( userExists ) {
    res.status(400).send("User already exists");
    console.log(`username with email: ${email} not found ><🔴🍌><`);
  }

  // console.log(`username: in request body is: ${username} >> 🏃‍♂️ <<`);
  // console.log(`email: in request body is: ${email} >> 📥📫📫 <<`);  
  // console.log(`password: in request body is: ${password} >> 💡 <<`);

  res.send(`the parameters are ${username}. email: ${email}. password: ${password}.`)
  
  const newUser = new User({ username, email, password });
  
  try {
    await newUser.save();

    res.status(201)
        .json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
      })

  } catch (error) {

    res.status(404)
    throw new Error( "Invalid user data" );
  }

});

export {
  createUser
};
