"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareNoteSchema = exports.updateNoteSchema = exports.getNoteSchema = exports.listNoteSchema = exports.createNoteSchema = void 0;
const zod_1 = require("zod");
exports.createNoteSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({ required_error: 'Title is required' }),
        body: (0, zod_1.string)({ required_error: 'Body is required' }),
        tags: (0, zod_1.string)().array().optional()
    })
});
exports.listNoteSchema = (0, zod_1.object)({
    query: (0, zod_1.object)({
        search: (0, zod_1.string)()
    })
});
exports.getNoteSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        id: (0, zod_1.string)({ required_error: 'Title is required' })
    })
});
exports.updateNoteSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)().optional(),
        body: (0, zod_1.string)().optional(),
        tags: (0, zod_1.string)().array().optional()
    })
});
exports.shareNoteSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        userId: (0, zod_1.string)({ required_error: 'User id is required' })
    })
});
