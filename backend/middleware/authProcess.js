import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT token from the 'jwt' cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      console.log("Authenticate user");
      next();
    } catch (error) {
      console.error("Error on authentification of user. Getting the token = Invalid user");
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    console.error("Error on authentification of user. Not authorized");
    res.status(401);
    throw new Error("Not authorized, no token.");
  }

});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    console.log("Authenticate Admin");

    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

export { authenticate, authorizeAdmin };
