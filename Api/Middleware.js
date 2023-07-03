const express = require('express');
const router = express.Router();

// Middleware function
function Middleware(req, res, next) {
  console.log('going in middleware');
  next();
}

// Use the middleware in the router
router.use(Middleware);

// Define your routes and additional middleware as needed

module.exports = Middleware;