// using express-async-handler package to avoid using the try{}catch{} syntax
const asyncHandler = require('express-async-handler');
const Car = require('../models/carModel');
// used for put and delete requests only
const User = require('../models/userModel');

// @desc Get cars
// @route GET /api/cars
// @access Private
const getCars = asyncHandler(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  const cars = await Car.find({ user: req.user.id });
  res.status(200).json(cars);
});

// @desc Post car
// @route POST /api/cars
// @access Private
const postCar = asyncHandler(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  if (!req.body.text) {
    res.status(400);
    // change express error handler to json response using custom middleware = errorHandler.js
    throw new Error('Add a text');
  }
  // send to DB is text is sent
  const car = await Car.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(car);
  console.log(req.body);
});

// @desc Update car
// @route PUT /api/cars/:id
// @access Private
const updateCar = asyncHandler(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  // get the unique id
  const { id } = req.params;
  const car = await Car.findById(id);
  // throw error is id is not found
  if (!car) {
    res.status(400);
    throw new Error('Car not found');
  }

  // check for user from the User model
  if (!req.user) {
    // throw error if user is not found
    res.status(401);
    throw new Error('User not found');
  }

  // check logged in user matches car user
  if (car.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // update DB if id is found. => id/textData/options[create if doesn't already exist]
  const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json(updatedCar);
  res.status(200).json({ message: `Update - Car: ${req.params.id}` });
});

// @desc Delete car
// @route DELETE /api/cars/:id
// @access Private
const deleteCar = asyncHandler(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
  // get unique id
  const { id } = req.params;
  const car = await Car.findById(id);
  // throw error if id is not found
  if (!car) {
    res.status(400);
    throw new Error('Car not found');
  }

  // check for user from the User model
  if (!req.user) {
    // throw error if user is not found
    res.status(401);
    throw new Error('User not found');
  }

  // check logged in user matches car user
  if (car.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  // delete DB if id is found
  const deletedCar = await Car.findByIdAndDelete(id);
  res.status(200).json(deletedCar);
  res.status(200).json({ message: `Delete - Car: ${req.params.id}` });
});

module.exports = {
  getCars,
  postCar,
  updateCar,
  deleteCar,
};
