"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Modules
var bcryptjs_1 = __importDefault(require("bcryptjs"));
function generateHash(password) {
    var salt = bcryptjs_1.default.genSaltSync();
    return bcryptjs_1.default.hashSync(password, salt);
}
exports.default = generateHash;
