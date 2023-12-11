"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordValidator = exports.newUserValidator = exports.loginUserValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
/* eslint-disable prettier/prettier */

var newUserValidator = exports.newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    firstname: _joi["default"].string().required(),
    lastname: _joi["default"].string().required(),
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().min(8).required(),
    confirmpassword: _joi["default"].string().required()
  });
  var _schema$validate = schema.validate(req.body),
    error = _schema$validate.error;
  if (error) {
    res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
      code: _httpStatusCodes["default"].BAD_REQUEST,
      data: error.message,
      message: error.message.replaceAll('"', '')
    });
  } else {
    next();
  }
};
var loginUserValidator = exports.loginUserValidator = function loginUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().required(),
    password: _joi["default"].string().min(8).required()
  });
  var _schema$validate2 = schema.validate(req.body),
    error = _schema$validate2.error;
  if (error) {
    res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
      code: _httpStatusCodes["default"].BAD_REQUEST,
      data: error.message,
      message: error.message.replaceAll('"', '')
    });
  } else {
    next();
  }
};
var passwordValidator = exports.passwordValidator = function passwordValidator(req, res, next) {
  var schema = _joi["default"].object({
    password: _joi["default"].string().min(8).required(),
    confirmpassword: _joi["default"].string().required()
  });
  var _schema$validate3 = schema.validate(req.body),
    error = _schema$validate3.error;
  if (error) {
    res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
      code: _httpStatusCodes["default"].BAD_REQUEST,
      data: error.message,
      message: error.message.replaceAll('"', '')
    });
  } else {
    next();
  }
};