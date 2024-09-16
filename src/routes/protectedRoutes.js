// src/routes/protectedRoutes.js
const express = require('express');
const router = express.Router();

// Define protected routes here
router.get('/example', (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;
