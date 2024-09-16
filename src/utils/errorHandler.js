// src/utils/errorHandler.js

/**
 * Error handling middleware for Express applications.
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    // Set the response status code
    res.status(err.statusCode || 500);
  
    // Send a JSON response with error details
    res.json({
      success: false,
      message: err.message || 'Internal Server Error',
      // Optionally include stack trace (useful for development)
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }
  
  module.exports = errorHandler;
  