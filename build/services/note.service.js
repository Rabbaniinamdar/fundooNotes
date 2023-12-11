"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNote = exports.unArchive = exports.getNoteofUser = exports.getAllNoteOfUser = exports.deleteNote = exports.archiveNote = exports.addToNote = exports.addToArchive = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _note = _interopRequireDefault(require("../models/note.model"));
var _dotenv = _interopRequireDefault(require("dotenv"));
/* eslint-disable prettier/prettier */

_dotenv["default"].config();

//Create New Note
var addToNote = exports.addToNote = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(currentUser, body) {
    var newNote;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          body.userId = currentUser;
          console.log(currentUser);
          _context.next = 4;
          return _note["default"].create(body);
        case 4:
          newNote = _context.sent;
          return _context.abrupt("return", newNote);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function addToNote(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//get all Not of a particular user
var getAllNoteOfUser = exports.getAllNoteOfUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(currentUser) {
    var notes;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _note["default"].find({
            userId: currentUser
          });
        case 2:
          notes = _context2.sent;
          return _context2.abrupt("return", notes);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getAllNoteOfUser(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

//get all Notes of a user
var getNoteofUser = exports.getNoteofUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _note["default"].findById(id);
        case 2:
          data = _context3.sent;
          return _context3.abrupt("return", data);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getNoteofUser(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

//delete single Note
var deleteNote = exports.deleteNote = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _note["default"].findByIdAndDelete(id);
        case 2:
          return _context4.abrupt("return", '');
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function deleteNote(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

//update single Note
var updateNote = exports.updateNote = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, body) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _note["default"].findByIdAndUpdate(id, body, {
            "new": true
          });
        case 2:
          data = _context5.sent;
          return _context5.abrupt("return", data);
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function updateNote(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

//get all archive Notes
var archiveNote = exports.archiveNote = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(currentUser) {
    var data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _note["default"].find({
            archived: true,
            userId: currentUser
          });
        case 2:
          data = _context6.sent;
          return _context6.abrupt("return", data);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function archiveNote(_x8) {
    return _ref6.apply(this, arguments);
  };
}();

//archive a single Note
var addToArchive = exports.addToArchive = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(id) {
    var data;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _note["default"].findByIdAndUpdate(id, {
            archived: true
          }, {
            "new": true
          });
        case 2:
          data = _context7.sent;
          return _context7.abrupt("return", data);
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function addToArchive(_x9) {
    return _ref7.apply(this, arguments);
  };
}();

//unarchive a single Note
var unArchive = exports.unArchive = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id) {
    var data;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _note["default"].findByIdAndUpdate(id, {
            archived: false
          }, {
            "new": true
          });
        case 2:
          data = _context8.sent;
          return _context8.abrupt("return", data);
        case 4:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function unArchive(_x10) {
    return _ref8.apply(this, arguments);
  };
}();