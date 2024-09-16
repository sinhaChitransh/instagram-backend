// const express = require('express');
// const { getUserProfile, updateUserProfile } = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');
// const router = express.Router();

// router.get('/profile', protect, getUserProfile);
// router.put('/profile', protect, updateUserProfile);

// module.exports = router;
const express = require('express');
const { getUserProfile, updateUserProfile, createUser, getUsers } = require('../controllers/userController');
// Comment out or remove the middleware import
// const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/', createUser);

// Temporarily bypass the protect middleware
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.get('/', getUsers);

module.exports = router;

