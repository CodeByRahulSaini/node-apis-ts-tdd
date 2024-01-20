"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const error_middleware_1 = require("../../middleware/error.middleware");
const auth_schema_1 = require("./auth.schema");
const router = express_1.default.Router();
router.post('/register', (0, error_middleware_1.validate)(auth_schema_1.createUserSchema), auth_controller_1.registerHandler);
router.post('/login', (0, error_middleware_1.validate)(auth_schema_1.loginUserSchema), auth_controller_1.loginHandler);
router.get('/refresh', auth_controller_1.refreshAccessTokenHandler);
router.post('/logout', auth_middleware_1.auth, auth_controller_1.logoutHandler);
exports.default = router;
