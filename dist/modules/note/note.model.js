"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_model_1 = require("../auth/user.model");
const mongoose_1 = require("mongoose");
let Note = class Note extends mongoose_1.Document {
};
exports.Note = Note;
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.User, required: true }),
    __metadata("design:type", Object)
], Note.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Note.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Note.prototype, "body", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], Note.prototype, "tags", void 0);
exports.Note = Note = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true
        }
    }),
    (0, typegoose_1.index)({ title: 'text', body: 'text', tags: 'text' }),
    (0, typegoose_1.index)({ userId: 1 })
], Note);
const noteModel = (0, typegoose_1.getModelForClass)(Note);
exports.default = noteModel;
