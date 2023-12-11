"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
/* eslint-disable prettier/prettier */

var AddToNoteSchema = new _mongoose.Schema({
  userId: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  archived: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
var _default = exports["default"] = (0, _mongoose.model)('AddToNote', AddToNoteSchema);