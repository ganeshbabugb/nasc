import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { id, password } = req.body;

  const user = await User.findOne({ id });

  if (user && (await user.matchPassword(password))) {
    // Update the last login timestamp
    user.lastLogin = new Date();
    await user.save();

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      id: user.id,
      role: user.role,
      department: user.department,
      lastLogin: user.lastLogin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid id or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, id, password, role } = req.body;

  const userExists = await User.findOne({ id });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    id,
    password,
    role,
    lastLogin: new Date(),
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      id: user.id,
      role: user.role,
      lastLogin: user.lastLogin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      id: user.id,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.id = req.body.id || user.id;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      id: updatedUser.id,
      role: updatedUser.role,
      lastLogin: updatedUser.lastLogin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
