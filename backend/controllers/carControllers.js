// using express-async-handler package to avoid using the try{}catch{} syntax
const asyncHandler = require('express-async-handler');

// @desc Get cars
// @route GET /api/cars
// @access Private
const getCars = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Home - All Cars' });
});

// @desc Post car
// @route POST /api/cars
// @access Private
const postCar = asyncHandler(async (req, res) => {
  if (!req.body.height) {
    res.status(400);
    // change express error handler to json response using custom middleware = errorHandler.js
    throw new Error('Add a height');
  }
  console.log(req.body);
  res.status(200).json({ message: 'Post - Car' });
});

// @desc Update car
// @route PUT /api/cars/:id
// @access Private
const updateCar = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update - Car: ${req.params.id}` });
});

// @desc Delete car
// @route DELETE /api/cars/:id
// @access Private
const deleteCar = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete - Car: ${req.params.id}` });
});

module.exports = {
  getCars,
  postCar,
  updateCar,
  deleteCar,
};
