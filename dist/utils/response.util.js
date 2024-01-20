"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.sendResponse = exports.AppError = exports.Status = void 0;
const http_status_1 = __importDefault(require("http-status"));
var Status;
(function (Status) {
    Status["Success"] = "success";
    Status["Error"] = "error";
})(Status || (exports.Status = Status = {}));
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
const sendResponse = (res, data, statusCode = http_status_1.default.OK, message) => {
    const response = {
        status: Status.Success,
        message,
        data
    };
    res.status(statusCode).json(response);
};
exports.sendResponse = sendResponse;
const errorHandler = (err, req, res) => {
    if (err instanceof AppError) {
        const response = {
            status: Status.Error,
            message: err.message
        };
        return res.status(err.statusCode).json(response);
    }
    const response = {
        status: Status.Error,
        message: 'An unexpected error occurred'
    };
    return res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(response);
};
exports.errorHandler = errorHandler;
