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
exports.findUser = exports.findAllUsers = exports.findUserById = exports.createUser = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.create(input);
    return user;
});
exports.createUser = createUser;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    return user;
});
exports.findUserById = findUserById;
const findAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.find();
});
exports.findAllUsers = findAllUsers;
const findUser = (query, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne(query, {}, options).select('+password');
});
exports.findUser = findUser;