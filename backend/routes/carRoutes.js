const express = require('express');

const router = express.Router();
// importing controller
const {
  getCars,
  postCar,
  updateCar,
  deleteCar,
} = require('../controllers/carController');

// get/post
router.route('/').get(getCars).post(postCar);
// update/delete
router.route('/:id').put(updateCar).delete(deleteCar);

module.exports = router;
