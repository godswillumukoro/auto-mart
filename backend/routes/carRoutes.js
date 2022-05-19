const express = require('express');

const router = express.Router();
const {
  getCars,
  postCar,
  updateCar,
  deleteCar,
} = require('../controllers/carControllers');
// get && post
router.route('/').get(getCars).post(postCar);
// put && delete
router.route('/:id').put(updateCar).delete(deleteCar);

module.exports = router;
