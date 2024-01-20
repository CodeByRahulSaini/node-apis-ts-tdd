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
exports.generateTokens = exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const signJwt = (payload, key, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const privateKey = Buffer.from(config_1.default.get(key), 'base64').toString('ascii');
    return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
});
exports.signJwt = signJwt;
const verifyJwt = (token, key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicKey = Buffer.from(config_1.default.get(key), 'base64').toString('ascii');
        return jsonwebtoken_1.default.verify(token, publicKey);
    }
    catch (error) {
        return null;
    }
});
exports.verifyJwt = verifyJwt;
const generateTokens = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = yield (0, exports.signJwt)(payload, 'accessTokenPrivateKey', {
        expiresIn: `${config_1.default.get('accessTokenExpiresIn')}m`
    });
    const refresh_token = yield (0, exports.signJwt)(payload, 'refreshTokenPrivateKey', {
        expiresIn: `${config_1.default.get('refreshTokenExpiresIn')}m`
    });
    return { access_token, refresh_token };
});
exports.generateTokens = generateTokens;
