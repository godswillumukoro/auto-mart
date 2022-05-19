const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // setting the error handler
  if (!req.body.text) {
    res.status(400);
    throw new Error('Add a text field');
  }
  const car = {
    text: req.body.text,
  };
  console.log(req.body.text);
  res.status(200).json(car);
});

// @desc Login new user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'Login User' });
});

// @desc Get profile
// @route GET /api/users/profile
// @access Public
const getProfile = asyncHandler(async (req, res) => {
  res.json({ message: 'My profile' });
});

module.exports = { registerUser, loginUser, getProfile };
