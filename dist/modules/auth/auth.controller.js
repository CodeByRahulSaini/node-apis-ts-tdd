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
exports.logoutHandler = exports.refreshAccessTokenHandler = exports.loginHandler = exports.registerHandler = void 0;
const config_1 = __importDefault(require("config"));
const auth_service_1 = require("./auth.service");
const trycatch_util_1 = __importDefault(require("../../utils/trycatch.util"));
const response_util_1 = require("../../utils/response.util");
const http_status_1 = __importDefault(require("http-status"));
const jwt_util_1 = require("../../utils/jwt.util");
const accessTokenCookieOptions = {
    expires: new Date(Date.now() + config_1.default.get('accessTokenExpiresIn') * 60 * 1000),
    maxAge: config_1.default.get('accessTokenExpiresIn') * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
};
const refreshTokenCookieOptions = {
    expires: new Date(Date.now() + config_1.default.get('refreshTokenExpiresIn') * 60 * 1000),
    maxAge: config_1.default.get('refreshTokenExpiresIn') * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax'
};
if (process.env.NODE_ENV === 'production')
    accessTokenCookieOptions.secure = true;
exports.registerHandler = (0, trycatch_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield (0, auth_service_1.findUser)({ email: req.body.email });
    if (userExists) {
        throw new response_util_1.AppError(http_status_1.default.BAD_REQUEST, 'Email already exists');
    }
    const user = yield (0, auth_service_1.createUser)({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    });
    const { email, _id, name } = user;
    (0, response_util_1.sendResponse)(res, { email, _id, name }, http_status_1.default.CREATED);
}));
exports.loginHandler = (0, trycatch_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_service_1.findUser)({ email: req.body.email });
    if (!user || !(yield user.comparePasswords(user.password, req.body.password))) {
        throw new response_util_1.AppError(http_status_1.default.UNAUTHORIZED, 'Invalid email or password');
    }
    yield setResponseTokens(res, user);
    const { email, _id, name } = user;
    (0, response_util_1.sendResponse)(res, { email, _id, name });
}));
const setResponseTokens = (res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { access_token, refresh_token } = yield (0, jwt_util_1.generateTokens)({ userId: user._id.toString() });
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    return { access_token, refresh_token };
});
exports.refreshAccessTokenHandler = (0, trycatch_util_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refresh_token = req.cookies.refresh_token;
    const decoded = yield (0, jwt_util_1.verifyJwt)(refresh_token, 'refreshTokenPublicKey');
    const message = 'Could not refresh access token! Login again!';
    if (!decoded) {
        return next(new response_util_1.AppError(http_status_1.default.FORBIDDEN, message));
    }
    const user = yield (0, auth_service_1.findUserById)(decoded.userId);
    if (!user) {
        return next(new response_util_1.AppError(http_status_1.default.FORBIDDEN, 'User not found'));
    }
    yield setResponseTokens(res, user);
    (0, response_util_1.sendResponse)(res);
}));
exports.logoutHandler = (0, trycatch_util_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', {
        maxAge: 1
    });
    (0, response_util_1.sendResponse)(res);
}));
