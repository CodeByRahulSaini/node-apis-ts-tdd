"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const response_util_1 = require("../utils/response.util");
const http_status_1 = __importDefault(require("http-status"));
exports.rateLimitMiddleware = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 10,
    headers: true,
    handler: (req, res, next) => {
        next(new response_util_1.AppError(http_status_1.default.TOO_MANY_REQUESTS, 'You have exceeded your 10 requests per minute limit.'));
    }
});
