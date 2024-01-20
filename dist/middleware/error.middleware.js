"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.notFoundHandler = exports.errorHandler = void 0;
const response_util_1 = require("../utils/response.util");
const zod_1 = require("zod");
const http_status_1 = __importDefault(require("http-status"));
class HttpException extends Error {
    constructor(statusCode, message, error) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error || null;
    }
}
exports.default = HttpException;
const errorHandler = (error, request, response, next) => {
    error.statusCode = error.statusCode || 500;
    response.status(error.statusCode).json({
        status: error.status || response_util_1.Status.Error,
        message: error.message
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (request, response, next) => {
    const err = new response_util_1.AppError(http_status_1.default.NOT_FOUND, `Route ${request.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
};
exports.notFoundHandler = notFoundHandler;
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            params: req.params,
            query: req.query,
            body: req.body
        });
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return res.status(400).json({
                status: response_util_1.Status.Error,
                error: err.errors
            });
        }
        next(err);
    }
    return;
};
exports.validate = validate;
