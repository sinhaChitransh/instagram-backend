const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');
const router = express.Router();

router.post('/login', loginUser); // Handles POST requests to /api/auth/login
router.post('/register', registerUser); // Handles POST requests to /api/auth/register

module.exports = router;

