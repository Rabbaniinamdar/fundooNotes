"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("./user.route"));
var _note = _interopRequireDefault(require("./note.rout"));
/* eslint-disable prettier/prettier */

var router = _express["default"].Router();
var routes = function routes() {
  router.get('/', function (req, res) {
    res.json('Welcome');
  });
  router.use('/users', _user["default"]);
  router.use('/note', _note["default"]);
  return router;
};
var _default = exports["default"] = routes;