// using express-async-handler package to avoid using the try{}catch{} syntax
const asyncHandler = require('express-async-handler');
const Car = require('../models/carModel');
// used for put and delete requests only
const User = require('../models/userModel');

// @desc Get cars
// @route GET /api/cars
// @access Private
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find({ user: req.user.id });
  res.status(200).json(cars);
});

// @desc Post car
// @route POST /api/cars
// @access Private
const postCar = asyncHandler(async (req, res) => {
  // throw an error is there is no text sent
  if (!req.body.text) {
    res.status(400);
    // change express error handler to json response using custom middleware = errorHandler.js
    throw new Error('Please add a text field');
  }
  // send to DB is text is sent
  const car = await Car.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(car);
});

// @desc Update car
// @route PUT /api/cars/:id
// @access Private
const updateCar = asyncHandler(async (req, res) => {
  // get the unique id
  const { id } = req.params;
  const car = await Car.findById(id);
  // throw error is id is not found
  if (!car) {
    res.status(400);
    throw new Error('Car not found');
  }

  // check for user from the User model
  const user = await User.findById(req.user.id);
  if (!user) {
    // throw error if user is not found
    res.status(401);
    throw new Error('User not found');
  }

  // check logged in user matches car user
  if (car.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // update DB if id is found. => id/textData/options[create if doesn't already exist]
  const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updatedCar);
});

// @desc Delete car
// @route DELETE /api/cars/:id
// @access Private
const deleteCar = asyncHandler(async (req, res) => {
  // get unique id
  const { id } = req.params;
  const car = await Car.findById(id);
  // throw error if id is not found
  if (!car) {
    res.status(400);
    throw new Error('Car not found');
  }

  // check for user from the User model
  const user = await User.findById(req.user.id);
  if (!user) {
    // throw error if user is not found
    res.status(401);
    throw new Error('User not found');
  }

  // check logged in user matches car user
  if (car.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  // delete DB if id is found
  const deletedCar = await Car.findByIdAndDelete(id);
  res.status(200).json(deletedCar);
});

module.exports = {
  getCars,
  postCar,
  updateCar,
  deleteCar,
};
