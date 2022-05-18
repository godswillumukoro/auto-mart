const asyncHandler = require('express-async-handler');
const Car = require('../models/carModel');

// @desc Get
// @route GET /api/cars
// @access Private
const getCars = asyncHandler(async (req, res) => {
  const cars = await Car.find();
  res.status(200).json(cars);
});

// @desc Post car
// @route POST /api/cars
// @access Private
const postCar = asyncHandler(async (req, res) => {
  // setting the error handler
  if (!req.body.text) {
    res.status(400);
    throw new Error('Add a text field');
  }
  const car = await Car.create({
    text: req.body.text,
  });
  console.log(req.body.name);
  res.status(200).json(car);
});

// @desc Update car
// @route PUT /api/cars/:id
// @access Private
const updateCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    req.status(400);
    throw new Error('Car not Found');
  }
  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedCar);
});

// @desc Delete car
// @route DELETE /api/cars/:id
// @access Private
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) {
    req.status(400);
    throw new Error('Car not found');
  }
  const deletedCar = await Car.findByIdAndDelete(req.params.id, req.body);

  res.status(200).json({ id: deletedCar.id });
});

module.exports = {
  getCars,
  postCar,
  updateCar,
  deleteCar,
};
