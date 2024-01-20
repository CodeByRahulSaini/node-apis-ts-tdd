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
exports.auth = void 0;
const response_util_1 = require("../utils/response.util");
const jwt_util_1 = require("../utils/jwt.util");
const http_status_1 = __importDefault(require("http-status"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let access_token;
        if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }
        if (!access_token) {
            return next(new response_util_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not logged in'));
        }
        const decoded = yield (0, jwt_util_1.verifyJwt)(access_token, 'accessTokenPublicKey');
        if (!decoded) {
            return next(new response_util_1.AppError(http_status_1.default.UNAUTHORIZED, `Invalid token or user doesn't exist`));
        }
        res.locals.userId = decoded.userId;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.auth = auth;
