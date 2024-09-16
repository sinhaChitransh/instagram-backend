// const express = require('express');
// const { createPost, getPosts, deletePost } = require('../controllers/postController');
// const { protect } = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/', protect, createPost);
// router.get('/', protect, getPosts);
// router.delete('/:id', protect, deletePost);

// module.exports = router;

const express = require('express');
const { createPost, getPosts, deletePost } = require('../controllers/postController');
// Comment out or remove the middleware import
// const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Temporarily bypass the protect middleware
router.post('/', createPost);
router.get('/', getPosts);
router.delete('/:id', deletePost);

module.exports = router;
