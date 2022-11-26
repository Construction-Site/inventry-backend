"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserIdValidation = exports.InventryValidation = void 0;
var joi_1 = __importDefault(require("joi"));
exports.InventryValidation = joi_1.default.object({
    displayName: joi_1.default.string().required(),
    uploaderId: joi_1.default.number().required(),
    price: joi_1.default.number().required(),
    unit: joi_1.default.string().required(),
    categoryId: joi_1.default.number().required(),
    displayImage: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
});
exports.UserIdValidation = joi_1.default.string().alphanum().required();
