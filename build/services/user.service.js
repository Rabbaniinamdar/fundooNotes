"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetPassword = exports.registerUser = exports.loginUser = exports.forgetPassword = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var userUtils = _interopRequireWildcard(require("../utils/user.util"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/* eslint-disable prettier/prettier */

_dotenv["default"].config();
var SECRET_KEY = process.env.SECRET_KEY;
var generateToken = function generateToken(userId) {
  var token = _jsonwebtoken["default"].sign({
    userId: userId
  }, SECRET_KEY, {
    expiresIn: '1h'
  });
  return token;
};
var hashPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    var salt, hash;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _bcrypt["default"].genSalt(10);
        case 2:
          salt = _context.sent;
          _context.next = 5;
          return _bcrypt["default"].hash(password, salt);
        case 5:
          hash = _context.sent;
          return _context.abrupt("return", hash);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function hashPassword(_x) {
    return _ref.apply(this, arguments);
  };
}();
var registerUser = exports.registerUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var email, password, confirmpassword, user, hash, newUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          email = body.email, password = body.password, confirmpassword = body.confirmpassword;
          _context2.next = 3;
          return _user["default"].findOne({
            email: email
          });
        case 3:
          user = _context2.sent;
          if (user) {
            _context2.next = 20;
            break;
          }
          _context2.next = 7;
          return hashPassword(password);
        case 7:
          hash = _context2.sent;
          if (!(password === confirmpassword)) {
            _context2.next = 17;
            break;
          }
          body.password = hash;
          body.confirmpassword = hash;
          _context2.next = 13;
          return _user["default"].create(body);
        case 13:
          newUser = _context2.sent;
          return _context2.abrupt("return", {
            data: 'User Registered Successfully',
            newUser: newUser
          });
        case 17:
          throw new Error('Password is not matching');
        case 18:
          _context2.next = 21;
          break;
        case 20:
          throw new Error('User already exists');
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function registerUser(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var loginUser = exports.loginUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var email, password, user, isPasswordCorrect, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          email = body.email, password = body.password;
          _context3.next = 3;
          return _user["default"].findOne({
            email: email
          });
        case 3:
          user = _context3.sent;
          if (!user) {
            _context3.next = 16;
            break;
          }
          _context3.next = 7;
          return _bcrypt["default"].compare(password, user.password);
        case 7:
          isPasswordCorrect = _context3.sent;
          if (!isPasswordCorrect) {
            _context3.next = 13;
            break;
          }
          token = generateToken(user._id);
          return _context3.abrupt("return", {
            data: 'User Logged in Successfully',
            token: token
          });
        case 13:
          throw new Error('Incorrect password');
        case 14:
          _context3.next = 17;
          break;
        case 16:
          throw new Error('User not found');
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function loginUser(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var forgetPassword = exports.forgetPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var email, user, token;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          email = body.email;
          _context4.next = 4;
          return _user["default"].findOne({
            email: email
          });
        case 4:
          user = _context4.sent;
          if (user) {
            _context4.next = 7;
            break;
          }
          throw new Error('User not found');
        case 7:
          token = _jsonwebtoken["default"].sign({
            userId: user._id
          }, process.env.SECRET_KEY_NAME, {
            expiresIn: '1h'
          });
          return _context4.abrupt("return", userUtils.sendEmail(token, email));
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          throw new Error('Internal server error');
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function forgetPassword(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var resetPassword = exports.resetPassword = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, userdetails) {
    var bearerToken, decodedToken, hashedPassword, user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          bearerToken = req.header('Authorization');
          decodedToken = _jsonwebtoken["default"].verify(bearerToken, process.env.SECRET_KEY_NAME);
          _context5.next = 5;
          return hashPassword(userdetails.userId);
        case 5:
          hashedPassword = _context5.sent;
          _context5.next = 8;
          return _user["default"].findByIdAndUpdate(decodedToken.userId, {
            password: hashedPassword,
            confirmpassword: hashedPassword
          }, {
            "new": true
          });
        case 8:
          user = _context5.sent;
          if (user) {
            _context5.next = 11;
            break;
          }
          throw new Error('User not found');
        case 11:
          return _context5.abrupt("return", {
            message: 'Password reset successfully'
          });
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          throw new Error('Internal server error: ' + _context5.t0.message);
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 14]]);
  }));
  return function resetPassword(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();