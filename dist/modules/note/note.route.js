"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = require("./note.controller");
const error_middleware_1 = require("../../middleware/error.middleware");
const note_schema_1 = require("./note.schema");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.auth, note_controller_1.list);
router.post('/', auth_middleware_1.auth, (0, error_middleware_1.validate)(note_schema_1.createNoteSchema), note_controller_1.add);
router.get('/:id', auth_middleware_1.auth, note_controller_1.get);
router.put('/:id', auth_middleware_1.auth, (0, error_middleware_1.validate)(note_schema_1.updateNoteSchema), note_controller_1.update);
router.delete('/:id', auth_middleware_1.auth, note_controller_1.remove);
router.post('/share/:id', auth_middleware_1.auth, (0, error_middleware_1.validate)(note_schema_1.shareNoteSchema), note_controller_1.share);
exports.default = router;
