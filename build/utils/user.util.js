"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
/* eslint-disable prettier/prettier */

var sendEmail = exports.sendEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token, email) {
    var transporter, mailOptions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          transporter = _nodemailer["default"].createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'funnyshortsu@gmail.com',
              pass: 'hxhr elxs mkiy hnan'
            }
          });
          mailOptions = {
            from: 'funnyshortsu@gmail.com',
            to: email,
            subject: 'Password Reset Token',
            text: "Your password reset token is: ".concat(token),
            // eslint-disable-next-line max-len
            html: "<h1>Hello,<br><br>Click on the given link to reset your password!</h1><br><h1>Link: \n            <a href=\"http://localhost:".concat(process.env.APP_PORT, "/api/v2/users/resetpassword\">click here</a></h1>")
          };
          _context.next = 5;
          return transporter.sendMail(mailOptions);
        case 5:
          return _context.abrupt("return", mailOptions);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          throw new Error(_context.t0);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function sendEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();