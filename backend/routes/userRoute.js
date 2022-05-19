const express = require('express');

const router = express.Router();
const {
  registerUser,
  loginUser,
  userProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// register / add new user
router.post('/', registerUser);
// login
router.post('/login', loginUser);
// profile
router.get('/profile', protect, userProfile);

module.exports = router;
