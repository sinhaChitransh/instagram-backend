// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');
const userRoutes = require('./src/routes/userRoutes');
const protectedRoutes = require('./src/routes/protectedRoutes'); // Import your protected routes
const insightModule = require('./src/utils/insightModule');
const errorHandler = require('./src/utils/errorHandler');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      message: err.message || 'An error occurred',
    });
  });
  app.get('/', (req, res) => {
    res.send('Server is running');
  });
  const morgan = require('morgan');
  app.use(morgan('combined')); // Logs all requests
  
// Custom Insight Middleware for Logging User Actions
// app.use((req, res, next) => {
//   insightModule.trackUserAction(req);
//   next();
// });

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// const { protect } = require('./src/middleware/authMiddleware');
// Conditionally apply the middleware based on an environment variable
const useAuth = false;

// // Use the protected routes with or without the protect middleware
// app.use('/api/protected', useAuth ? protect : (req, res, next) => next(), protectedRoutes);

// Routes for Authentication, Posts, and Users
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.get('/test', (req, res) => {
    res.send('Test route is working!');
  });
  

// Error handling middleware
app.use(errorHandler);

// Logging Middleware
app.use((req, res, next) => {
  console.log(`Request to: ${req.originalUrl}`);
  next();
});

// Define the port
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for use in index.js
module.exports = app;
