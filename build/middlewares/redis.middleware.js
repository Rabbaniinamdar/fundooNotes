"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.client = void 0;
var _redis = require("redis");
/* eslint-disable prettier/prettier */

var client = exports.client = (0, _redis.createClient)();
var getUserMiddleware = function getUserMiddleware(req, res, next) {
  var userId = req.params.userId; // Assuming userId is part of the URL parameters

  // Check if user data is cached in Redis
  client.get("user:".concat(userId), function (err, userData) {
    if (err) {
      console.error('Error retrieving user data from Redis:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (userData) {
      // If user data is found in Redis cache, attach it to the request object
      req.user = JSON.parse(userData);
      next();
    } else {
      // If user data is not in Redis cache, proceed to the next middleware or route
      next();
    }
  });
};
var _default = exports["default"] = getUserMiddleware;