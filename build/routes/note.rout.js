"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var noteController = _interopRequireWildcard(require("../controllers/note.controller"));
var _auth = require("../middlewares/auth.middleware");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/* eslint-disable prettier/prettier */

var router = _express["default"].Router();

//route to add to note
router.post('/', _auth.userAuth, noteController.addToNote);

//route to get all note of particular user
router.get('/', _auth.userAuth, noteController.getAllNoteOfUser);

//route to update note
router.put('/:id', _auth.userAuth, noteController.updateNote);

//route to delete note
router["delete"]('/:id', _auth.userAuth, noteController.deleteNote);

//route to get all archive note
router.get('/archive', _auth.userAuth, noteController.archiveNote);

//route to add single note of particular user
router.get('/:id', _auth.userAuth, noteController.getNoteofUser);

//route to do unarchive a note
router.put('/archive/:id', _auth.userAuth, noteController.addToArchive);

//route to do unarchive a note
router.put('/unarchive/:id', _auth.userAuth, noteController.unArchive);

//route to do delete archive a note
router["delete"]('/deletearchive/:id', _auth.userAuth, noteController.deleteNote);
var _default = exports["default"] = router;