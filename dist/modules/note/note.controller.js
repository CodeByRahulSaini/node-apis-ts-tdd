"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.share = exports.remove = exports.update = exports.get = exports.list = exports.add = void 0;
const http_status_1 = __importDefault(require("http-status"));
const note_service_1 = require("./note.service");
const response_util_1 = require("../../utils/response.util");
const trycatch_util_1 = __importDefault(require("../../utils/trycatch.util"));
exports.add = (0, trycatch_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield (0, note_service_1.createNote)(Object.assign({ userId: res.locals.userId }, req.body));
    (0, response_util_1.sendResponse)(res, { note }, http_status_1.default.CREATED);
}));
exports.list = (0, trycatch_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const withSearch = req.query.search ? { $text: { $search: req.query.search } } : {};
    const notes = yield (0, note_service_1.findAllNotes)(Object.assign({ userId: res.locals.userId }, withSearch));
    (0, response_util_1.sendResponse)(res, { notes });
}));
exports.get = (0, trycatch_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield (0, note_service_1.findNote)({ _id: req.params.id, userId: res.locals.userId });
    if (!note) {
        throw new response_util_1.AppError(http_status_1.default.BAD_REQUEST, 'Note not found');
    }
    (0, response_util_1.sendResponse)(res, { note });
}));
exports.update = (0, trycatch_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield (0, note_service_1.updateNote)({ _id: req.params.id, userId: res.locals.userId }, req.body);
    (0, response_util_1.sendResponse)(res, { note });
}));
exports.remove = (0, trycatch_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deletedCount } = yield (0, note_service_1.deleteNote)({ _id: req.params.id, userId: res.locals.userId });
    if (deletedCount === 0) {
        throw new response_util_1.AppError(http_status_1.default.BAD_REQUEST, 'Note not found');
    }
    (0, response_util_1.sendResponse)(res);
}));
exports.share = (0, trycatch_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield (0, note_service_1.shareNote)({ _id: req.params.id }, req.body.userId);
    (0, response_util_1.sendResponse)(res, { note });
}));
