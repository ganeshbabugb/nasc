import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    // Extract the token from the cookies
    token = req.cookies.jwt;

    try {
      // Verified token returns user ID
      const decoded = jwt.verify(token, config.JWT_SECRET);

      // Find user object in the database and assign it to req.user
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }
});

export { protect };
