const asyncHandler = require('express-async-handler');
// @desc Get
// @route GET /api/cars
// @access Private
const getCars = asyncHandler((req, res) => {
  res.status(200).json({ message: 'All cars' });
});

// @desc Post car
// @route POST /api/cars
// @access Private
const postCar = asyncHandler((req, res) => {
  // setting the error handler
  if (!req.body.name) {
    res.status(400);
    throw new Error('Add a text field');
  }
  console.log(req.body.name);
  res.status(200).json({ message: 'Set cars' });
});

// @desc Update car
// @route PUT /api/cars/:id
// @access Private
const updateCar = asyncHandler((req, res) => {
  res.status(200).json({ message: `Update car ${req.params.id}` });
});

// @desc Delete car
// @route DELETE /api/cars/:id
// @access Private
const deleteCar = asyncHandler((req, res) => {
  res.status(200).json({ message: `Delete car ${req.params.id}` });
});

module.exports = {
  getCars,
  postCar,
  updateCar,
  deleteCar,
};
