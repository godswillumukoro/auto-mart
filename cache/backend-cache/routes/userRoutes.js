const express = require('express');

const router = express.Router();
// importing controller
const {
  registerUser,
  loginUser,
  getProfile,
} = require('../controllers/userController');

// register
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
// login
// get user info

module.exports = router;
