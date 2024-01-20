"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("config"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = require("./middleware/error.middleware");
const rate_limiter_middleware_1 = require("./middleware/rate-limiter.middleware");
const note_route_1 = __importDefault(require("./modules/note/note.route"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const app = (0, express_1.default)();
exports.app = app;
app.use(rate_limiter_middleware_1.rateLimitMiddleware);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: config_1.default.get('origin'),
    credentials: true
}));
if (process.env.NODE_ENV === 'development')
    app.use((0, morgan_1.default)('dev'));
app.use('/api/auth', auth_route_1.default);
app.use('/api/notes', note_route_1.default);
app.all('*', error_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
