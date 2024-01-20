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
exports.shareNote = exports.deleteNote = exports.updateNote = exports.findNote = exports.findAllNotes = exports.createNote = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const note_model_1 = __importDefault(require("./note.model"));
const createNote = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return note_model_1.default.create(input);
});
exports.createNote = createNote;
const findAllNotes = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return note_model_1.default.find(query);
});
exports.findAllNotes = findAllNotes;
const findNote = (query, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return note_model_1.default.findOne(query, {}, options);
});
exports.findNote = findNote;
const updateNote = (query, input) => __awaiter(void 0, void 0, void 0, function* () {
    return note_model_1.default.findOneAndUpdate(query, input, { new: true });
});
exports.updateNote = updateNote;
const deleteNote = (query) => {
    return note_model_1.default.deleteOne(query);
};
exports.deleteNote = deleteNote;
const shareNote = (query, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const note = yield note_model_1.default.findOne(query).lean();
    note === null || note === void 0 ? true : delete note._id;
    const mongooseId = new mongoose_1.default.Types.ObjectId(userId);
    return (0, exports.createNote)(Object.assign(Object.assign({}, note), { userId: mongooseId }));
});
exports.shareNote = shareNote;
