const express = require('express');

const router = express.Router();
const {
  getCars,
  postCar,
  updateCar,
  deleteCar,
} = require('../controllers/carController');
const { protect } = require('../middleware/authMiddleware');
// get && post
router.route('/').get(protect, getCars).post(protect, postCar);
// put && delete
router.route('/:id').put(protect, updateCar).delete(protect, deleteCar);

module.exports = router;
