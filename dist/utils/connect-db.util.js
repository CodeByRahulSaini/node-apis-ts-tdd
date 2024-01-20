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
exports.clearDatabase = exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const dbUrl = config_1.default.get(process.env.NODE_ENV === 'test' ? 'dbURITest' : 'dbURI');
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(dbUrl);
        console.log('Database connected...');
    }
    catch (error) {
        console.log(`DB Connection error | Retrying...`);
        setTimeout(connectDB, 10000);
    }
});
exports.connectDB = connectDB;
const disconnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
});
exports.disconnectDB = disconnectDB;
const clearDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        yield collection.deleteMany({});
    }
});
exports.clearDatabase = clearDatabase;
