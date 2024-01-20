"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connect_db_util_1 = require("./utils/connect-db.util");
const app_1 = require("./app");
const config_1 = __importDefault(require("config"));
const port = config_1.default.get('port');
const server = app_1.app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
    (0, connect_db_util_1.connectDB)();
});
const shutDown = () => {
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
        (0, connect_db_util_1.disconnectDB)().then(() => {
            console.log('Database disconnected...');
            process.exit(0);
        });
    });
};
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
